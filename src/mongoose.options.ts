import { Injectable } from "@nestjs/common";
import {
    MongooseOptionsFactory,
    MongooseModuleOptions,
} from "@nestjs/mongoose";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { __Logger } from "./--logger/--logger.service";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        const mongooseLogger = new __Logger();
        mongooseLogger.setContext(this.createMongooseOptions.name);

        const mongoServer = new MongoMemoryServer();
        mongoose.Promise = Promise;

        return mongoServer.getUri().then((mongoUri) => {
            mongooseLogger.log(mongoUri);
            return {
                uri: mongoUri,
            };
        });
    }
}
