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
} from '@nestjs/common';
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import SymbolsUser from '@/user/symbols-user';
import { IUserService } from '@/user/domain/services/user.interface.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(SymbolsUser.IUserService)
    private readonly userService: IUserService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    try {
      return await this.userService.create(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findUser(@Query() query: GetUserDTO) {
    try {
      const { id, email } = query;

      if (id) {
        return await this.userService.findById(id);
      }

      if (email) {
        return await this.userService.findByEmail(email);
      }

      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async updateUser(@Body() body: UpdateUserDTO, @Query() query: GetUserDTO) {
    try {
      const { id } = query;
      return await this.userService.update(id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
