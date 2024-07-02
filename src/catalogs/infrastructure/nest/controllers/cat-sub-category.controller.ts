import SymbolsCatalogs from '../../../symbols-catalogs';
import { CreateCategoryDTO, GetCategoryrDTO } from '../dtos/cat-category.dto';
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
import { CatSubCategoryService } from 'src/catalogs/application/services/cat-sub-category.service';

@Controller('sub-category')
export class CatSubCategoryController {
  constructor(
    @Inject(SymbolsCatalogs.ICatSubCategoryService)
    private readonly catSubCategoryService: CatSubCategoryService,
  ) {}

  @UseGuards(AuthGuards, RoleGuards)
  @Post('/:categoryId')
  async create(@Body() body: CreateCategoryDTO, @Param() categoryId: string) {
    return await this.catSubCategoryService.create(body, categoryId);
  }

  @Get()
  async findAll(@Query() query: GetCategoryrDTO) {
    const { id } = query;
    if (id) return await this.catSubCategoryService.findSubCategoryById(id);
    return await this.catSubCategoryService.findAll();
  }
}
