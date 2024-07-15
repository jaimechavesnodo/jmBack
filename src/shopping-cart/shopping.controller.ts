import { Controller, Get, Param, Delete, HttpStatus } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { ShoppingLogic } from './shopping.logic';
import { ShoppingCart } from './entities/shopping.entity';

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

}