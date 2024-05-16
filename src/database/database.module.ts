import config from "../config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forRoot(config().mongo.mongo_uri)],
    exports: [MongooseModule],
})
export class DatabaseModule { }