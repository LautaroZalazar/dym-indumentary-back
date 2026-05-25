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
export class SellerOrAdminGuard implements CanActivate {
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

    const findUser = await this.userService.findById(user._id);
    const roleName = findUser.toJSON().role.name;

    if (roleName === TypeRoles.ADMIN || roleName === TypeRoles.SELLER) {
      return true;
    }

    throw new BaseErrorException('Insufficient permissions', HttpStatus.UNAUTHORIZED);
  }
}
