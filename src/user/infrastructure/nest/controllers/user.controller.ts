import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Inject,
  Get,
  Query,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import SymbolsUser from '../../../symbols-user';
import { IUserService } from 'src/user/domain/services/user.interface.service';
import { AuthGuards } from 'src/auth/infrastructure/nest/guards/auth.guard';
import { IUserRequest } from 'src/core/infrastructure/nest/dtos/custom-request/user.request';

@Controller('user')
export class UserController {
  constructor(
    @Inject(SymbolsUser.IUserService)
    private readonly userService: IUserService,
  ) { }

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    try {
      return await this.userService.create(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuards)
  @Get()
  async findUser(@Query() query: GetUserDTO, @Req() req: IUserRequest) {
    try {
      const { email } = query;

      if (email) {
        return await this.userService.findByEmail(req.user.email);
      }

      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuards)
  @Get('detail')
  async findUserById(@Req() req: IUserRequest) {
    try {
      const { _id } = req.user;

      return await this.userService.findById(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuards)
  @Put()
  async updateUser(@Body() body: UpdateUserDTO, @Req() req: IUserRequest) {
    try {
      const { _id } = req.user;
      return await this.userService.update(_id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
