import { IAddressService } from '@/address/domain/services/address.interface.service';
import SymbolsAddress from '@/address/symbols-address';
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
} from '@nestjs/common';
import {
  CreateAddressDTO,
  GetAddressDTO,
  UpdateAddressDTO,
} from '../dtos/address.dto';
import { AddressModel } from '@/address/domain/models/address.model';

@Controller('address')
export class AddressController {
  constructor(
    @Inject(SymbolsAddress.IAddressService)
    private readonly addressService: IAddressService,
  ) {}

  @Post()
  async create(@Body() body: CreateAddressDTO): Promise<AddressModel> {
    try {
      return await this.addressService.create(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async find(@Query() query: GetAddressDTO): Promise<AddressModel> {
    try {
      const { id } = query;

      return await this.addressService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

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
