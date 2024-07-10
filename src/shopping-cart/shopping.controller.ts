import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { ShoppingLogic } from './shopping.logic';
import {ProductCartDto } from './dto/product-cart'

@Controller('Shopping')
export class ShoppingController {
    constructor(private readonly shoppingService: ShoppingService, private readonly shoppingLogic: ShoppingLogic) { }
    
  @Get('getProductsCart/:idProduct')
  findOne(@Param('idProduct') idProduct: number): Promise<ProductCartDto> {
    return this.shoppingService.findOne(idProduct);
  }
}