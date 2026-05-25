import { Controller, Get, Inject, Param } from '@nestjs/common';
import SymbolsVariant from '../../../symbols-variant';
import { IVariantService } from '../../../domain/services/variant.interface.service';

@Controller('product')
export class PublicVariantController {
  constructor(
    @Inject(SymbolsVariant.IVariantService)
    private readonly variantService: IVariantService,
  ) {}

  @Get(':id/variants')
  async findByProduct(@Param('id') id: string) {
    const variants = await this.variantService.findPublicByProduct(id);
    return variants.map((v) => {
      const json: any = v.toJSON();
      delete json.barcode;
      delete json.minStock;
      return json;
    });
  }
}
