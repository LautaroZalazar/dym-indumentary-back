import { ICatRoleService } from 'src/catalogs/domain/services/cat-role.interface.service';
import SymbolsCatalogs from 'src/catalogs/symbols-catalogs';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateRoleDTO, GetRoleByNameDTO } from '../dtos/cat-role.dto';
import { AuthGuards } from 'src/auth/infrastructure/nest/guards/auth.guard';

@Controller('role')
export class CatRoleController {
  constructor(
    @Inject(SymbolsCatalogs.ICatRoleService)
    private readonly catRoleService: ICatRoleService,
  ) { }

  @Get()
  async getByName(@Query() query: GetRoleByNameDTO) {
    try {
      const { name } = query;
      return await this.catRoleService.getByName(name);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuards)
  @Post()
  async createRole(@Body() body: CreateRoleDTO) {
    try {
      const { role } = body;
      return await this.catRoleService.create(role);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
