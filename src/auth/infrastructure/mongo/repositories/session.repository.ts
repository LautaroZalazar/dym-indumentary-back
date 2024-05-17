import { Injectable } from "@nestjs/common";
import { ISessionRepository } from "src/auth/domain/repositories/session.interface.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SessionSchema } from "../schemas/session.schema";
import { SessionModel } from "src/auth/domain/models/session.model";

@Injectable()

export class SessionRepository implements ISessionRepository {
    constructor(
        @InjectModel('Session') private readonly sessionModel: Model<SessionSchema>
    ) { }

    async create(session: SessionModel): Promise<any> {
        try {
            const schema = new this.sessionModel(session.toJSON());
            const saved = await schema.save();
            return saved
        } catch (error) {
            throw new Error(error);
        }
    }

    async findByToken(token: string): Promise<SessionModel> {
        try {
            const session = await this.sessionModel.findOne({ token });
            return session && SessionModel.hydrate(session)
        } catch (error) {
            throw new Error(error);
        }
    }
}