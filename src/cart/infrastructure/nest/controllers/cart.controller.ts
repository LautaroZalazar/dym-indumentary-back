import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { ICartService } from '../../../../cart/domain/services/cart.interface.service';
import SymbolsCart from '../../../../cart/symbols-cart';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
    try {
      const { id } = query;

      return await this.cartService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuards)
  @Post()
  async addProductToCart(@Body() body: AddProductToCartDTO) {
    try {
      return await this.cartService.addProductToCart(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuards)
  @Put()
  async UpdateProductInCart(@Body() body: UpdateProductInCartDTO) {
    try {
      return await this.cartService.updateProductInCart(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuards)
  @Delete()
  async removeProductFromCart(@Body() body: RemoveProductCartDTO) {
    try {
      return await this.cartService.removeProductFromCart(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
