import { Module } from "@nestjs/common";
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PondsModule } from './ponds/ponds.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: true,
            playground: true,
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.gql',
        }),
        PondsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
