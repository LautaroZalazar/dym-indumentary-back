import { HttpStatus, Injectable } from '@nestjs/common';
import { ISessionRepository } from '../../../../auth/domain/repositories/session.interface.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SessionSchema } from '../schemas/session.schema';
import { SessionModel } from '../../../../auth/domain/models/session.model';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class SessionRepository implements ISessionRepository {
  constructor(
    @InjectModel('Session') private readonly sessionModel: Model<SessionSchema>,
  ) {}

  async create(session: SessionModel): Promise<any> {
    try {
      const schema = new this.sessionModel(session.toJSON());
      const saved = await schema.save();
      return saved;
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByToken(token: string): Promise<SessionModel> {
    try {
      const session = await this.sessionModel.findOne({ token });
      return session && SessionModel.hydrate(session);
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
