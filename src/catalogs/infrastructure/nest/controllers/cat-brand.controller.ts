import { ICatBrandService } from '@/catalogs/domain/services/cat-brand.interface.service';
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
} from '@nestjs/common';
import { CreateBrandDTO, GetBrandDTO } from '../dtos/cat-brand.dto';

@Controller('brand')
export class CatBrandController {
  constructor(
    @Inject(SymbolsCatalogs.ICatBrandService)
    private readonly catBrandService: ICatBrandService,
  ) {}

  @Post()
  async create(@Body() body: CreateBrandDTO) {
    try {
      const { brand } = body;
      return await this.catBrandService.create(brand);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Query() query: GetBrandDTO) {
    try {
      const { id } = query;

      if (id) return await this.catBrandService.findBrandById(id);

      return await this.catBrandService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
