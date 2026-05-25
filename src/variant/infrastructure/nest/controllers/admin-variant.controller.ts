import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import SymbolsVariant from '../../../symbols-variant';
import { IVariantService } from '../../../domain/services/variant.interface.service';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { RoleGuards } from '../../../../auth/infrastructure/nest/guards/role.guard';
import {
  GetLowStockDTO,
  GetMovementsDTO,
  GetVariantsDTO,
  SuggestSkuDTO,
  VariantCreateDTO,
  VariantUpdateDTO,
} from '../dtos/variant.dto';

@Controller('admin/variant')
@UseGuards(AuthGuards, RoleGuards)
export class AdminVariantController {
  constructor(
    @Inject(SymbolsVariant.IVariantService)
    private readonly variantService: IVariantService,
  ) {}

  @Get('low-stock')
  async lowStock(@Query() query: GetLowStockDTO) {
    return this.variantService.findLowStock({
      threshold: query.threshold,
      page: query.page,
      limit: query.limit,
    });
  }

  @Get('by-sku/:sku')
  async findBySku(@Param('sku') sku: string) {
    return this.variantService.findBySku(sku);
  }

  @Post('suggest-sku')
  async suggestSku(@Body() body: SuggestSkuDTO) {
    return this.variantService.suggestSku(body);
  }

  @Get(':id/movements')
  async movements(
    @Param('id') id: string,
    @Query() query: GetMovementsDTO,
  ) {
    return this.variantService.findMovements({
      variantId: id,
      page: query.page,
      limit: query.limit,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.variantService.findById(id);
  }

  @Get()
  async findAll(@Query() query: GetVariantsDTO) {
    return this.variantService.findAll({
      productId: query.productId,
      page: query.page,
      limit: query.limit,
    });
  }

  @Post()
  async create(@Body() body: VariantCreateDTO, @Req() req: any) {
    return this.variantService.create(body, req.user?._id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: VariantUpdateDTO,
    @Req() req: any,
  ) {
    return this.variantService.update(id, body, req.user?._id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.variantService.delete(id);
    return { ok: true };
  }
}
