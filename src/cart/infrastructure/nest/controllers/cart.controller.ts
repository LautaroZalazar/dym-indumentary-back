import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { ICartService } from '../../../../cart/domain/services/cart.interface.service';
import SymbolsCart from '../../../../cart/symbols-cart';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  GetCartDTO,
  AddProductToCartDTO,
  UpdateProductInCartDTO,
  RemoveProductCartDTO,
} from '../dtos/cart.dto';

@Controller('cart')
export class CartController {
  constructor(
    @Inject(SymbolsCart.ICartService)
    private readonly cartService: ICartService,
  ) {}

  @UseGuards(AuthGuards)
  @Get()
  async find(@Query() query: GetCartDTO) {
    const { id } = query;
    return await this.cartService.findById(id);
  }

  @UseGuards(AuthGuards)
  @Post()
  async addProductToCart(@Body() body: AddProductToCartDTO) {
    return await this.cartService.addProductToCart(body);
  }

  @UseGuards(AuthGuards)
  @Put()
  async UpdateProductInCart(@Body() body: UpdateProductInCartDTO) {
    return await this.cartService.updateProductInCart(body);
  }

  @UseGuards(AuthGuards)
  @Delete()
  async removeProductFromCart(@Body() body: RemoveProductCartDTO) {
    return await this.cartService.removeProductFromCart(body);
  }
}
