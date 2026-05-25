import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuards } from '../../../../auth/infrastructure/nest/guards/auth.guard';
import { SellerOrAdminGuard } from '../../../../auth/infrastructure/nest/guards/seller-or-admin.guard';
import { ISaleService } from '../../../domain/services/sale.interface.service';
import SymbolsSale from '../../../symbols-sale';
import { CreateCustomerDTO, CreateSaleDTO, SearchQueryDTO } from '../dtos/sale.dto';
import { IUserRequest } from '../../../../core/infrastructure/nest/dtos/custom-request/user.request';
import SymbolsUser from '../../../../user/symbols-user';
import { IUserService } from '../../../../user/domain/services/user.interface.service';
import { TypeRoles } from '../../../../core/domain/enums/type-roles.enum';

@Controller('sale')
@UseGuards(AuthGuards, SellerOrAdminGuard)
export class SaleController {
  constructor(
    @Inject(SymbolsSale.ISaleService)
    private readonly saleService: ISaleService,
    @Inject(SymbolsUser.IUserService)
    private readonly userService: IUserService,
  ) {}

  @Post()
  async create(@Body() body: CreateSaleDTO, @Req() req: IUserRequest) {
    return this.saleService.create(body, req.user._id);
  }

  @Get()
  async findAll(@Req() req: IUserRequest) {
    const user = await this.userService.findById(req.user._id);
    const isAdmin = user.toJSON().role.name === TypeRoles.ADMIN;
    return this.saleService.findAll(req.user._id, isAdmin);
  }

  @Get('search/products')
  async searchProducts(@Query() query: SearchQueryDTO) {
    return this.saleService.searchProducts(query.q);
  }

  @Get('search/users')
  async searchUsers(@Query() query: SearchQueryDTO) {
    return this.saleService.searchUsers(query.q);
  }

  @Post('customer')
  async createCustomer(@Body() body: CreateCustomerDTO) {
    return this.saleService.createCustomer(body);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.saleService.findById(id);
  }
}
