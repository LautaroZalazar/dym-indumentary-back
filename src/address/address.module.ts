import { Module } from '@nestjs/common';
import { AddressController } from './infrastructure/nest/controllers/address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  addressSchema,
  userSchema,
} from './infrastructure/constants/custom-schema';
import {
  addressRepository,
  addressService,
} from './infrastructure/constants/custom-provider';

@Module({
  imports: [MongooseModule.forFeature([addressSchema, userSchema])],
  controllers: [AddressController],
  providers: [addressService, addressRepository],
  exports: [],
})
export class AddressModule {}
