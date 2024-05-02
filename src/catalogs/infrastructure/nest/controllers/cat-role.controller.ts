import { ICatRoleService } from '@/catalogs/domain/services/cat-role.interface.service';
import SymbolsCatalogs from '@/catalogs/symbols-catalogs';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateRoleDTO, GetRoleByNameDTO } from '../dtos/cat-role.dto';

@Controller('role')
export class CatRoleController {
  constructor(
    @Inject(SymbolsCatalogs.ICatRoleService)
    private readonly catRoleService: ICatRoleService,
  ) {}

  @Get()
  async getByName(@Query() query: GetRoleByNameDTO) {
    try {
      const { name } = query;
      return await this.catRoleService.getByName(name);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

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
