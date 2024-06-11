import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import SymbolsAdmin from '../../../symbols-admin';
import { IProductService } from '../../../domain/services/product.interface.service';
import { IUserService } from '../../../domain/services/user.interface.service';
import { ProductCreateDTO, ProductUpdateDTO } from '../dtos/product.dto';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { RoleGuards } from '../../../../auth/infrastructure/nest/guards/role.guard';

@Controller('admin')
export class AdminController {
  constructor(
    @Inject(SymbolsAdmin.IProductService)
    private readonly productService: IProductService,
    @Inject(SymbolsAdmin.IUserService)
    private readonly userService: IUserService,
  ) {}

  @UseGuards(AuthGuards, RoleGuards)
  @Post('product')
  async create(@Body() product: ProductCreateDTO) {
    return await this.productService.create(product);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Put('product/:id')
  async update(@Param('id') id: string, @Body() product: ProductUpdateDTO) {
    return await this.productService.update(id, product);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Get('user')
  async findUser() {
    return await this.userService.findAll();
  }
}
