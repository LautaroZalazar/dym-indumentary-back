import { ICatColorService } from '@/catalogs/domain/services/cat-color.interface.service';
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
import { CreateColorDTO, GetColorDTO } from '../dtos/cat-color.dto';

@Controller('color')
export class CatColorController {
  constructor(
    @Inject(SymbolsCatalogs.ICatColorService)
    private readonly catColorService: ICatColorService,
  ) {}

  @Post()
  async create(@Body() body: CreateColorDTO) {
    try {
      const { color } = body;

      return await this.catColorService.create(color);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Query() query: GetColorDTO) {
    try {
      const { id } = query;

      if (id) return await this.catColorService.findColorById(id);

      return await this.catColorService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
