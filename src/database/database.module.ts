import config from "../config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot(config().mongo.mongo_uri, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 30000,
            maxPoolSize: 5,
            bufferCommands: false,
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule { }