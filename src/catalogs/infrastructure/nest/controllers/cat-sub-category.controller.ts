import SymbolsCatalogs from '../../../symbols-catalogs';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { RoleGuards } from '../../../../auth/infrastructure/nest/guards/role.guard';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CatSubCategoryService } from '../../../application/services/cat-sub-category.service';
import {
  CreateSubCategoryDTO,
  GetSubCategoryrDTO,
} from '../dtos/cat-sub-category.dto copy';

@Controller('sub-category')
export class CatSubCategoryController {
  constructor(
    @Inject(SymbolsCatalogs.ICatSubCategoryService)
    private readonly catSubCategoryService: CatSubCategoryService,
  ) {}

  @UseGuards(AuthGuards, RoleGuards)
  @Post()
  async create(@Body() body: CreateSubCategoryDTO) {
    return await this.catSubCategoryService.create(body);
  }

  @Get()
  async findAll(@Query() query: GetSubCategoryrDTO) {
    const { id } = query;
    if (id) return await this.catSubCategoryService.findSubCategoryById(id);
    return await this.catSubCategoryService.findAll();
  }
}
