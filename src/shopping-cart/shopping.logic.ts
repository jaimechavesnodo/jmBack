import { Injectable } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { ShoppingCart } from './entities/shopping.entity';
import { CreateShoppingCartDto } from './dto/save-product-cart';


@Injectable()
export class ShoppingLogic {
    constructor( 
        private readonly shoppingService: ShoppingService
    ) {}

}