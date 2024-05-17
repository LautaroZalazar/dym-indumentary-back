import { IAddressService } from 'src/address/domain/services/address.interface.service';
import SymbolsAddress from 'src/address/symbols-address';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CreateAddressDTO,
  GetAddressDTO,
  UpdateAddressDTO,
} from '../dtos/address.dto';
import { AddressModel } from 'src/address/domain/models/address.model';
import { AuthGuards } from 'src/auth/infrastructure/nest/guards/auth.guard';
import { IUserRequest } from 'src/core/infrastructure/nest/dtos/custom-request/user.request';

@Controller('address')
export class AddressController {
  constructor(
    @Inject(SymbolsAddress.IAddressService)
    private readonly addressService: IAddressService,
  ) { }

  @UseGuards(AuthGuards)
  @Post()
  async create(
    @Body() body: CreateAddressDTO,
    @Req() req: IUserRequest,
  ): Promise<AddressModel> {
    try {
      const { _id } = req.user;
      return await this.addressService.create(_id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuards)
  @Get()
  async find(@Query() query: GetAddressDTO): Promise<AddressModel> {
    try {
      const { id } = query;

      return await this.addressService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuards)
  @Put()
  async update(
    @Query() query: GetAddressDTO,
    @Body() body: UpdateAddressDTO,
  ): Promise<AddressModel> {
    try {
      const { id } = query;

      return await this.addressService.update(id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
