import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import bodyParser from "body-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import figlet from "figlet";

import { AppModule } from "./app.module";
import WinstonLogger from "./--logger/winston.logger";
import { __Logger } from "./--logger/--logger.service";
import pkg from "../package.json";

async function bootstrap() {
    console.log(
        figlet.textSync(pkg.name, {
            horizontalLayout: "default",
            verticalLayout: "default",
        })
    );

    const port = 3000;

    const bootstrapLogger = new __Logger();
    bootstrapLogger.setContext(bootstrap.name);

    const app = await NestFactory.create(AppModule, {
        logger: WinstonLogger,
    });

    app.use(helmet());
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    });

    await app.listen(port);

    bootstrapLogger.log(
        `NODE_ENV=${
            process.env.NODE_ENV
        } => Application is running on: ${await app.getUrl()} :Port ${port}`
    );
}

bootstrap();
