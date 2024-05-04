import { Module } from '@nestjs/common';
import { AddressController } from './infrastructure/nest/controllers/address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { addressSchema } from './infrastructure/constants/custom-schema';
import {
  addressRepository,
  addressService,
} from './infrastructure/constants/custom-provider';

@Module({
  imports: [MongooseModule.forFeature([addressSchema])],
  controllers: [AddressController],
  providers: [addressService, addressRepository],
  exports: [],
})
export class AddressModule {}
