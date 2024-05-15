import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/nest/controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  userRepository,
  userService,
  catRoleRepository,
} from './infrastructure/constants/custom-provider';
import {
  cartSchema,
  roleSchema,
  userSchema,
} from './infrastructure/constants/custom-schema';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    MongooseModule.forFeature([userSchema, roleSchema, cartSchema]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [userService, userRepository, catRoleRepository],
  exports: [],
})
export class UserModule {}
