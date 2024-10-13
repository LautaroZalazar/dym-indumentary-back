import { IAuthService } from '../../../../auth/domain/services/auth.interface.service';
import SymbolsAuth from '../../../../auth/symbols-auth';
import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginBodyDTO, RecoveryPasswordDTO } from '../dtos/auth.dto';
import { UserRecoveryPasswordDTO } from '../dtos/user.dto';
import { IUserService } from '../../../domain/services/user.interface.service';
import { AuthGuards } from '../guards/auth.guard';
import { IUserRequest } from '../../../../core/infrastructure/nest/dtos/custom-request/user.request';

@Controller('auth')
export class authController {
  constructor(
    @Inject(SymbolsAuth.IAuthService)
    private readonly authService: IAuthService,
    @Inject(SymbolsAuth.IUserService)
    private readonly userService: IUserService,
  ) {}
  @Post('login')
  async logIn(@Body() body: LoginBodyDTO) {
    return await this.authService.logIn(body);
  }

  @Post('recovery-password')
  async recoveryPasswordFindUser(@Body() body: RecoveryPasswordDTO) {
    await this.authService.recoveryPassword(body);
    return { msg: 'Email send', status: 200 };
  }

  @UseGuards(AuthGuards)
  @Put('recovery-password')
  async updatePassword(
    @Body() body: UserRecoveryPasswordDTO,
    @Req() req: IUserRequest,
  ) {
    const { password } = body;
    const { _id } = req.user;
    await this.userService.update(password, _id);
    return { msg: 'Password was Updated', status: 200 };
  }
}
