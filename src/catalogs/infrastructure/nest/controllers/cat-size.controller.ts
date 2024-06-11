import { ICatSizeService } from '../../../domain/services/cat-size.interface.service';
import SymbolsCatalogs from '../../../symbols-catalogs';
import { CreateSizeDTO, GetSizeDTO } from '../dtos/cat-size.dto';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { RoleGuards } from '../../../../auth/infrastructure/nest/guards/role.guard';
import {
  Body,
  Controller,
  Inject,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller('size')
export class CatSizeController {
  constructor(
    @Inject(SymbolsCatalogs.ICatSizeService)
    private readonly catSizeService: ICatSizeService,
  ) {}

  @UseGuards(AuthGuards, RoleGuards)
  @Post()
  async createSize(@Body() body: CreateSizeDTO) {
    const { size } = body;
    return await this.catSizeService.create(size);
  }

  @Get()
  async getAll(@Query() query: GetSizeDTO) {
    const { id } = query;
    if (id) return await this.catSizeService.findSizeById(id);
    return await this.catSizeService.findAll();
  }
}
