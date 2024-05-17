import { ICatSizeService } from '../../../domain/services/cat-size.interface.service';
import SymbolsCatalogs from '../../../symbols-catalogs';
import { CreateSizeDTO, GetSizeDTO } from '../dtos/cat-size.dto';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import {
  Body,
  Controller,
  Inject,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller('size')
export class CatSizeController {
  constructor(
    @Inject(SymbolsCatalogs.ICatSizeService)
    private readonly catSizeService: ICatSizeService,
  ) {}

  @UseGuards(AuthGuards)
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
