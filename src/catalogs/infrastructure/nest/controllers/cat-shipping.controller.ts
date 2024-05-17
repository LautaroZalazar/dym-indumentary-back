import { ICatShippingService } from '../../../domain/services/cat-shipping.interface.service';
import SymbolsCatalogs from '../../../symbols-catalogs';
import { CreateShippingDTO, GetShippingDTO } from '../dtos/cat-shipping.dto';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
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

@Controller('shipping')
export class CatShippingController {
  constructor(
    @Inject(SymbolsCatalogs.ICatShippingService)
    private readonly catShippingService: ICatShippingService,
  ) {}

  @UseGuards(AuthGuards)
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
