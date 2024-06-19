import { ICatRoleService } from '../../../domain/services/cat-role.interface.service';
import SymbolsCatalogs from '../../../symbols-catalogs';
import { CreateRoleDTO, GetRoleByNameDTO } from '../dtos/cat-role.dto';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { RoleGuards } from '../../../../auth/infrastructure/nest/guards/role.guard';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller('role')
export class CatRoleController {
  constructor(
    @Inject(SymbolsCatalogs.ICatRoleService)
    private readonly catRoleService: ICatRoleService,
  ) {}

  @Get()
  async getByName(@Query() query: GetRoleByNameDTO) {
    const { name } = query;
    return await this.catRoleService.getByName(name);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Post()
  async createRole(@Body() body: CreateRoleDTO) {
    const { role } = body;
    return await this.catRoleService.create(role);
  }
}
