import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import SymbolsAdmin from '../../../symbols-admin';
import { IProductService } from '../../../domain/services/product.interface.service';
import { IUserService } from '../../../domain/services/user.interface.service';
import { GetProductsWithFiltersDTO, ProductCreateDTO, ProductUpdateDTO } from '../dtos/product.dto';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { RoleGuards } from '../../../../auth/infrastructure/nest/guards/role.guard';
import { GetUserDTO, GetUsersWithFiltersDTO, UpdateUserDTO, CreateUserAdminDTO } from '../dtos/user.dto';
import SymbolsOrder from '../../../../order/symbols-order';
import { IOrderService } from '../../../../admin/domain/services/order.interface.service';
import { IReportService } from '../../../domain/services/reports.interface.service';
import { GetReportDTO } from '../dtos/reports.dto';
import { ProductTemplateService } from '../../../application/services/product-template.service';
import { ProductImportService } from '../../../application/services/product-import.service';
import type { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(
    @Inject(SymbolsAdmin.IProductService)
    private readonly productService: IProductService,
    @Inject(SymbolsAdmin.IUserService)
    private readonly userService: IUserService,
    @Inject(SymbolsOrder.IOrderService)
    private readonly orderService: IOrderService,
    @Inject(SymbolsAdmin.IReportService)
    private readonly reportService: IReportService,
    private readonly templateService: ProductTemplateService,
    private readonly importService: ProductImportService,
  ) { }

  @UseGuards(AuthGuards, RoleGuards)
  @Get('product/template')
  async downloadProductTemplate(@Res() res: Response) {
    try {
      const buffer = await this.templateService.generateProductTemplate();
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="plantilla-productos.xlsx"',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-store',
      });
      res.end(buffer);
    } catch (error) {
      res.status(500).json({ message: 'Error al generar la plantilla', error: error.message });
    }
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Post('product/import')
  @UseInterceptors(FileInterceptor('file'))
  async importProducts(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { error: 'No se recibió ningún archivo' };
    }
    return this.importService.importFromExcel(file.buffer);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Get('product')
  async findAllWithFilters(@Query() filters: GetProductsWithFiltersDTO) {
    return await this.productService.findAllWithFilters(filters);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Post('product')
  async create(@Body() product: ProductCreateDTO) {
    return await this.productService.create(product);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Put('product/:id')
  async productUpdate(
    @Param('id') id: string,
    @Body() product: ProductUpdateDTO,
  ) {
    return await this.productService.update(id, product);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Get('user')
  async findUser(@Query() filters: GetUsersWithFiltersDTO) {
    return await this.userService.findAll(filters);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Patch('user')
  async userUpdate(@Query() query: GetUserDTO, @Body() body: UpdateUserDTO) {
    const { userId } = query;
    return await this.userService.update(userId, body);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Get('order')
  async findAllOrders() {
    return await this.orderService.findAll();
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Get('reports/sales')
  async getSalesReport(@Query() query: GetReportDTO) {
    return await this.reportService.getSalesReport(query.period ?? 'all', query.date);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Get('reports/inventory')
  async getInventoryReport() {
    return await this.reportService.getInventoryReport();
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Get('reports/top-products')
  async getTopProductsReport(@Query() query: GetReportDTO) {
    return await this.reportService.getTopProductsReport(query.period ?? 'all', query.date);
  }

  @UseGuards(AuthGuards, RoleGuards)
  @Post('user')
  async createUser(@Body() body: CreateUserAdminDTO) {
    return await this.userService.createUserWithRole(body);
  }
}
