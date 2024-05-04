import { ICatShippingService } from '@/catalogs/domain/services/cat-shipping.interface.service';
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
import { CreateShippingDTO, GetShippingDTO } from '../dtos/cat-shipping.dto';

@Controller('shipping')
export class CatShippingController {
  constructor(
    @Inject(SymbolsCatalogs.ICatShippingService)
    private readonly catShippingService: ICatShippingService,
  ) {}

  @Post()
  async create(@Body() body: CreateShippingDTO) {
    try {
      const { shipping } = body;

      return await this.catShippingService.create(shipping);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async find(@Query() query: GetShippingDTO) {
    try {
      const { id } = query;

      if (id) return await this.catShippingService.findShippingById(id);

      return await this.catShippingService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}