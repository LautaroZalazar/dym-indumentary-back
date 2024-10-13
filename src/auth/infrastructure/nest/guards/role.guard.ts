import { TypeRoles } from '../../../../core/domain/enums/type-roles.enum';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import SymbolsUser from '../../../../user/symbols-user';
import { IUserService } from '../../../domain/services/user.interface.service';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class RoleGuards implements CanActivate {
  constructor(
    @Inject(SymbolsUser.IUserService)
    private readonly userService: IUserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new BaseErrorException('User doesn´t exist', HttpStatus.NOT_FOUND);
    }

    const findRole = await this.userService.findById(user._id);

    if (findRole.toJSON().role.name === TypeRoles.ADMIN) {
      return true;
    } else {
      throw new BaseErrorException(
        'Insufficient permissions',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
