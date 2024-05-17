import { TypeRoles } from '../../../../core/domain/enums/type-roles.enum';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import SymbolsUser from '../../../../user/symbols-user';
import { IUserService } from '../../../domain/services/user.interface.service';

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
      throw new UnauthorizedException('User doesn´t exist');
    }

    const findRole = await this.userService.findById(user._id);

    if (findRole.toJSON().role.name === TypeRoles.ADMIN) {
      return true;
    } else {
      throw new UnauthorizedException('Insufficient permissions');
    }
  }
}
