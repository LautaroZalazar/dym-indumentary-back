import { ICatCategoryService } from '@/catalogs/domain/services/cat-category.interface.service';
import SymbolsCatalogs from '@/catalogs/symbols-catalogs';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDTO, GetCategoryrDTO } from '../dtos/cat-category.dto';
import { AuthGuards } from '@/auth/infrastructure/nest/guards/auth.guard';

@Controller('category')
export class CatCategoryController {
  constructor(
    @Inject(SymbolsCatalogs.ICatCategoryService)
    private readonly catCategoryService: ICatCategoryService,
  ) {}

  @UseGuards(AuthGuards)
  @Post()
  async create(@Body() body: CreateCategoryDTO) {
    try {
      return await this.catCategoryService.create(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Query() query: GetCategoryrDTO) {
    try {
      const { id } = query;

      if (id) return await this.catCategoryService.findCategoryById(id);

      return await this.catCategoryService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
