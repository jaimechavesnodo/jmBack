import { Controller, Get, Post, Body, Param, Delete, HttpStatus } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { ShoppingLogic } from './shopping.logic';
import { ShoppingCart } from './entities/shopping.entity';
import { CreateShoppingCartDto } from './dto/save-product-cart';

@Controller('Shopping')
export class ShoppingController {
    constructor(private readonly shoppingService: ShoppingService, private readonly shoppingLogic: ShoppingLogic) { }
    

  @Get('getCartData/:idUser')
  async findAll(@Param('idUser') idUser: number): Promise<ShoppingCart[]> {
    return this.shoppingService.findAll(idUser);
  }

  @Delete('deleteProduct/:idUser/:idProduct')
  async deleteProduct(@Param('idUser') idUser: number, @Param('idProduct') idProduct: number,
  ): Promise<void> {
    await this.shoppingService.deleteProduct(idUser, idProduct);
  }

  @Post('saveProductsCart')
  async saveProductsCart(@Body() createShoppingCartDto: CreateShoppingCartDto) {
  return this.shoppingService.create(createShoppingCartDto);
  }
  
}