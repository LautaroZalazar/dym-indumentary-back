import { ICatShippingService } from '../../../domain/services/cat-shipping.interface.service';
import SymbolsCatalogs from '../../../symbols-catalogs';
import { CreateShippingDTO, GetShippingDTO } from '../dtos/cat-shipping.dto';
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

@Controller('shipping')
export class CatShippingController {
  constructor(
    @Inject(SymbolsCatalogs.ICatShippingService)
    private readonly catShippingService: ICatShippingService,
  ) {}

  @UseGuards(AuthGuards, RoleGuards)
  @Post()
  async create(@Body() body: CreateShippingDTO) {
    const { shipping } = body;
    return await this.catShippingService.create(shipping);
  }

  @Get()
  async find(@Query() query: GetShippingDTO) {
    const { id } = query;
    if (id) return await this.catShippingService.findShippingById(id);
    return await this.catShippingService.findAll();
  }
}
