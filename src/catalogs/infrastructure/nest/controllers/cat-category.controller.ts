import { ICatCategoryService } from '../../../domain/services/cat-category.interface.service';
import SymbolsCatalogs from '../../../symbols-catalogs';
import { CreateCategoryDTO, GetCategoryrDTO } from '../dtos/cat-category.dto';
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

@Controller('category')
export class CatCategoryController {
  constructor(
    @Inject(SymbolsCatalogs.ICatCategoryService)
    private readonly catCategoryService: ICatCategoryService,
  ) {}

  @UseGuards(AuthGuards, RoleGuards)
  @Post()
  async create(@Body() body: CreateCategoryDTO) {
    return await this.catCategoryService.create(body);
  }

  @Get()
  async findAll(@Query() query: GetCategoryrDTO) {
    const { id } = query;
    if (id) return await this.catCategoryService.findCategoryById(id);
    return await this.catCategoryService.findAll();
  }
}
