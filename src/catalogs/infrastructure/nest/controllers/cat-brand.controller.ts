import { ICatBrandService } from '../../../domain/services/cat-brand.interface.service';
import SymbolsCatalogs from '../../../symbols-catalogs';
import { CreateBrandDTO, GetBrandDTO } from '../dtos/cat-brand.dto';
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

@Controller('brand')
export class CatBrandController {
  constructor(
    @Inject(SymbolsCatalogs.ICatBrandService)
    private readonly catBrandService: ICatBrandService,
  ) {}

  @UseGuards(AuthGuards, RoleGuards)
  @Post()
  async create(@Body() body: CreateBrandDTO) {
    const { brand } = body;
    return await this.catBrandService.create(brand);
  }

  @Get()
  async findAll(@Query() query: GetBrandDTO) {
    const { id } = query;
    if (id) return await this.catBrandService.findBrandById(id);
    return await this.catBrandService.findAll();
  }
}
