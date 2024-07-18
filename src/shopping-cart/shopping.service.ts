import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './entities/shopping.entity';
import { CreateShoppingCartDto } from './dto/save-product-cart';
import { GetShoppingCart } from './dto/shopping-customer';



@Injectable()
export class ShoppingService {
    constructor(
        @InjectRepository(ShoppingCart)
    private shoppingRepository: Repository<ShoppingCart>,
    ) {}

    async getDtoShopping(dto: GetShoppingCart): Promise<ShoppingCart> {
        const { idUser, idProduct } = dto;
        const shoppingCart = await this.shoppingRepository.findOne({ where: { idUser, idProduct },});
        return shoppingCart;
    }

    findOneByUser( idUser: number ): Promise<ShoppingCart> {
        return this.shoppingRepository.findOneBy({ idUser });
    }

    findOne( id: number ): Promise<ShoppingCart> {
        return this.shoppingRepository.findOneBy({ id });
    }

    async deleteProduct(idUser: number, idProduct: number): Promise<void> {
        const result = await this.shoppingRepository.delete({ idUser, idProduct });
    }

    async create(dto: CreateShoppingCartDto): Promise<ShoppingCart> {
        const newShoppingCart = this.shoppingRepository.create(dto);
        return this.shoppingRepository.save(newShoppingCart); 
    }
    
    async findCountAndSumTotalForIdProduct(idProduct: number, idUser: number): Promise<{ cantidadRedimida: number, totalSuma: number }> {
        const queryResult = await this.shoppingRepository
            .createQueryBuilder('shopping')
            .select('COUNT(*)', 'cantidadRedimida')
            .addSelect('SUM(shopping.total)', 'totalSuma')
            .where('shopping.idProduct = :idProduct', { idProduct })
            .andWhere('shopping.idUser = :idUser', { idUser })
            .getRawOne();
    
        return {
            cantidadRedimida: parseInt(queryResult.cantidadRedimida, 10),
            totalSuma: parseFloat(queryResult.totalSuma),
        };
    }

    async findCountAndSumTotal(idUser: number): Promise<{ totalRegistros: number, totalSuma: number }> {
        const queryResult = await this.shoppingRepository
            .createQueryBuilder('shopping')
            .select('COUNT(*)', 'totalRegistros')
            .addSelect('SUM(shopping.total)', 'totalSuma')
            .andWhere('shopping.idUser = :idUser', { idUser })
            .getRawOne();
    
        return {
            totalRegistros: parseInt(queryResult.totalRegistros, 10),
            totalSuma: parseFloat(queryResult.totalSuma),
        };
    }
    
}
