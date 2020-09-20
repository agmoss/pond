import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticlesModule } from "./articles/articles.module";
import { GraphqlOptions } from "./graphql.options";
import { LoggerModule } from "./--logger/--logger.module";
import { MongooseConfigService } from "./mongoose.options";

@Module({
    imports: [
        GraphQLModule.forRootAsync({
            useClass: GraphqlOptions,
        }),
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
        }),
        ArticlesModule,
        LoggerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
