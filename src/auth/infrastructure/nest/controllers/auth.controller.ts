import { IAuthService } from '../../../../auth/domain/services/auth.interface.service';
import SymbolsAuth from '../../../../auth/symbols-auth';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
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
    try {
      await this.authService.recoveryPassword(body);
      const data = {
        message:
          'Se ha enviado un correo con las instrucciones para recuperar la contraseña',
        status: 200,
      };
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuards)
  @Put('recovery-password')
  async updatePassword(
    @Body() body: UserRecoveryPasswordDTO,
    @Req() req: IUserRequest,
  ) {
    try {
      const { password } = body;
      const { _id } = req.user;
      return await this.userService.update(password, _id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
