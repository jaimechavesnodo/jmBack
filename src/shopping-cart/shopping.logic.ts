import { Injectable } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { CreateShoppingCartDto } from './dto/save-product-cart';
import { GetShoppingCart } from './dto/shopping-customer';


@Injectable()
export class ShoppingLogic {
    constructor( 
        private readonly shoppingService: ShoppingService
    ) {}

    async createAndFindSummary(dto: CreateShoppingCartDto, idProduct: number, idUser: number): Promise<any> {
            const newShoppingCart = await this.shoppingService.create(dto);
            const queryResult = await this.shoppingService.findCountAndSumTotalForIdProduct(idProduct, idUser);
        return {
            cantidadRedimida: queryResult.cantidadRedimida,
            totalSuma: queryResult.totalSuma,
            data: newShoppingCart, 
        };
    }

    async findAndGetData(idUser: number, idProduct: number): Promise<any> {
        const newShoppingCart = await this.shoppingService.findOneByUser(idUser);
        const queryResult = await this.shoppingService.findCountAndSumTotalForIdProduct(idProduct, idUser);
        
        return {
            cantidadRedimida: queryResult.cantidadRedimida,
            totalSuma: queryResult.totalSuma,
            data: newShoppingCart, 
        };
    }


}