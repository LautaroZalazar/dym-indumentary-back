import { IAddressService } from '../../../../address/domain/services/address.interface.service';
import SymbolsAddress from '../../../../address/symbols-address';
import {
  Body,
  Controller,
  Get,
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
import { AddressModel } from '../../../../address/domain/models/address.model';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { IUserRequest } from '../../../../core/infrastructure/nest/dtos/custom-request/user.request';

@Controller('address')
export class AddressController {
  constructor(
    @Inject(SymbolsAddress.IAddressService)
    private readonly addressService: IAddressService,
  ) {}

  @UseGuards(AuthGuards)
  @Post()
  async create(
    @Body() body: CreateAddressDTO,
    @Req() req: IUserRequest,
  ): Promise<AddressModel> {
    const { _id } = req.user;
    return await this.addressService.create(_id, body);
  }

  @UseGuards(AuthGuards)
  @Get()
  async find(@Query() query: GetAddressDTO): Promise<AddressModel> {
    const { id } = query;
    return await this.addressService.findById(id);
  }

  @UseGuards(AuthGuards)
  @Put()
  async update(
    @Query() query: GetAddressDTO,
    @Body() body: UpdateAddressDTO,
  ): Promise<AddressModel> {
    const { id } = query;
    return await this.addressService.update(id, body);
  }
}
