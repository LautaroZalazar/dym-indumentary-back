import config from "../config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot(config().mongo.mongo_uri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
            socketTimeoutMS: 8000,
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule { }