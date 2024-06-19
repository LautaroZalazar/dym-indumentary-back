import { ICatColorService } from '../../../domain/services/cat-color.interface.service';
import SymbolsCatalogs from '../../../symbols-catalogs';
import { CreateColorDTO, GetColorDTO } from '../dtos/cat-color.dto';
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

@Controller('color')
export class CatColorController {
  constructor(
    @Inject(SymbolsCatalogs.ICatColorService)
    private readonly catColorService: ICatColorService,
  ) {}

  @UseGuards(AuthGuards, RoleGuards)
  @Post()
  async create(@Body() body: CreateColorDTO) {
    const { color, hex } = body;
    return await this.catColorService.create(color, hex);
  }

  @Get()
  async findAll(@Query() query: GetColorDTO) {
    const { id } = query;
    if (id) return await this.catColorService.findColorById(id);
    return await this.catColorService.findAll();
  }
}
