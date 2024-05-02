import { Module } from '@nestjs/common';
import { CatRoleController } from './infrastructure/nest/controllers/cat-role.controller';
import {
  catRoleService,
  catRoleRepository,
} from './infrastructure/constants/custom-provider';
import { MongooseModule } from '@nestjs/mongoose';
import { CatRole, CatRoleSchema } from '@/database/schemas/cat-role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CatRole.name, schema: CatRoleSchema }]),
  ],
  controllers: [CatRoleController],
  providers: [catRoleService, catRoleRepository],
  exports: [],
})
export class CatalogsModule {}
