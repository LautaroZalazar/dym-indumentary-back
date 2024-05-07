import { SessionModel } from "../models/session.model"

export interface ISessionRepository {
    create (session: SessionModel): Promise<any>
    findByToken (token: string): Promise<SessionModel>
}