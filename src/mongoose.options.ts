import { Injectable } from "@nestjs/common";
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        const mongoServer = new MongoMemoryServer();
        mongoose.Promise = Promise;
        return mongoServer.getUri().then((mongoUri) => {
            return {
                uri: mongoUri,
            };
        });
    }
}