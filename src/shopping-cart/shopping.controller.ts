import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { ShoppingLogic } from './shopping.logic';
import { CreateShoppingCartDto } from './dto/save-product-cart';

@Controller('Shopping')
export class ShoppingController {
    constructor(private readonly shoppingService: ShoppingService, private readonly shoppingLogic: ShoppingLogic) { }

  @Get('getCartData/:idUser')
  async getCartData(@Param('idUser') idUser: number) {
    return this.shoppingService.getAggregatedData(idUser);
  }

  @Delete('deleteProduct/:idUser/:idProduct')
  async deleteProduct(@Param('idUser') idUser: number, @Param('idProduct') idProduct: number,
  ): Promise<void> {
    await this.shoppingService.deleteProduct(idUser, idProduct);
  }

  @Post('saveProductsCart')
    async createAndFindSummary( @Body() body: { idProduct: number, idUser: number, dto: CreateShoppingCartDto },) {
      const { idProduct, idUser, dto } = body;
    return this.shoppingLogic.createAndFindSummary(dto, idProduct, idUser);
  }

  @Get('totalSummary/:idUser')
  async getSummaryTotal(@Param('idUser') idUser: number) {
    return this.shoppingService.findCountAndSumTotal(idUser);
  }
  
}