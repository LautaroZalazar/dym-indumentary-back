import {
  Body,
  Controller,
  Post,
  Inject,
  Get,
  Query,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import SymbolsUser from '../../../symbols-user';
import { IUserService } from '../../../domain/services/user.interface.service';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { IUserRequest } from '../../../../core/infrastructure/nest/dtos/custom-request/user.request';
import { RoleGuards } from '../../../../auth/infrastructure/nest/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(
    @Inject(SymbolsUser.IUserService)
    private readonly userService: IUserService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    return await this.userService.create(body);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Get()
  async findUser(@Query() query: GetUserDTO, @Req() req: IUserRequest) {
    const { email } = query;

    if (email) {
      return await this.userService.findByEmail(req.user.email);
    }
  }

  @UseGuards(AuthGuards)
  @Get('detail')
  async findUserById(@Req() req: IUserRequest) {
    const { _id } = req.user;

    return await this.userService.findById(_id);
  }

  @UseGuards(AuthGuards)
  @Put()
  async updateUser(@Body() body: UpdateUserDTO, @Req() req: IUserRequest) {
    const { _id } = req.user;
    return await this.userService.update(_id, body);
  }
}
