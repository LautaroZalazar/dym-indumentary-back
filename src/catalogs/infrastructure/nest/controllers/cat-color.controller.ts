import { ICatColorService } from '../../../domain/services/cat-color.interface.service';
import SymbolsCatalogs from '../../../symbols-catalogs';
import { CreateColorDTO, GetColorDTO } from '../dtos/cat-color.dto';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { RoleGuards } from '../../../../auth/infrastructure/nest/guards/role.guard';
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

@Controller('color')
export class CatColorController {
  constructor(
    @Inject(SymbolsCatalogs.ICatColorService)
    private readonly catColorService: ICatColorService,
  ) { }

  @UseGuards(AuthGuards, RoleGuards)
  @Post()
  async create(@Body() body: CreateColorDTO) {
    try {
      const { color, hex } = body;

      return await this.catColorService.create(color, hex);
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
