import { Identifier } from 'src/core/domain/value-objects/identifier';
import { BaseModel } from 'src/core/domain/models/base.model';

export class SessionModel extends BaseModel {
    private _token: string;

    public toJSON() {
        const aggregate = this._id ? { _id: this._id.toValue() } : {}
        return { ...aggregate, token: this._token }
    }

    static create(session: any): SessionModel {
        const newSession = new SessionModel(new Identifier(session._id))
        newSession._token = session.token
        return newSession
    }

    static hydrate(session: any): SessionModel {
        const newSession = new SessionModel(new Identifier(session._id))
        newSession._token = session.token
        return newSession
    }
} 