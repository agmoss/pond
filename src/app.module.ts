import { Module } from "@nestjs/common";
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PondsModule } from './ponds/ponds.module';
import { GraphqlOptions } from "./graphql.options";
import { LoggerModule } from './--logger/--logger.module';

@Module({
    imports: [
        GraphQLModule.forRootAsync({
            useClass: GraphqlOptions,
        }),
        PondsModule,
        LoggerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
