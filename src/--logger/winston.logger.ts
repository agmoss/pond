import {
    WinstonModule,
} from "nest-winston";
import * as winston from "winston";
import chalk from "chalk"

const WL = WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf((info) => {
                    const {
                        timestamp, level, message, context, ...args
                    } = info;

                    const ts = timestamp.slice(0, 19).replace('T', ' ');
                    return ` ${chalk.red(context)} ${chalk.bgBlueBright(chalk.black(ts))} [${level}]: ${chalk.magenta(message)} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
                }),
            ),
        }),
        new winston.transports.File({
            filename: "combined.log",
            level: "info",
        }),
        new winston.transports.File({
            filename: "errors.log",
            level: "error",
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: "exceptions.log" }),
    ],
});

export default WL;