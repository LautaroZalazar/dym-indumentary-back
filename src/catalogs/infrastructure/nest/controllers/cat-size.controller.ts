import { ICatSizeService } from '@/catalogs/domain/services/cat-size.interface.service';
import SymbolsCatalogs from '@/catalogs/symbols-catalogs';
import {
  Body,
  Controller,
  Inject,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreateSizeDTO, GetSizeDTO } from '../dtos/cat-size.dto';

@Controller('size')
export class CatSizeController {
  constructor(
    @Inject(SymbolsCatalogs.ICatSizeService)
    private readonly catSizeService: ICatSizeService,
  ) {}

  @Post()
  async createSize(@Body() body: CreateSizeDTO) {
    try {
      const { size } = body;

      return await this.catSizeService.create(size);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAll(@Query() query: GetSizeDTO) {
    try {
      const { id } = query;

      if (id) return await this.catSizeService.findSizeById(id);
      return await this.catSizeService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
