import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './entities/shopping.entity';
import { CreateShoppingCartDto } from './dto/save-product-cart';


@Injectable()
export class ShoppingService {
    constructor(
        @InjectRepository(ShoppingCart)
    private shoppingRepository: Repository<ShoppingCart>,
    ) {}

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

    async getAggregatedData(idUser: number) {
        const queryResult = await this.shoppingRepository
            .createQueryBuilder('shopping')
            .select('shopping.idProduct', 'idProduct')
            .addSelect('COUNT(*)', 'redeemedAmount')
            .addSelect('SUM(shopping.pointsProduct)', 'pointsProduct')
            .addSelect('SUM(shopping.total)', 'total')
            .addSelect('shopping.idUser', 'idUser')
            .addSelect('shopping.imageUrl', 'imageUrl')
            .addSelect('shopping.description', 'description')
            .where('shopping.idUser = :idUser', { idUser })
            .groupBy('shopping.idProduct')
            .addGroupBy('shopping.idUser')
            .addGroupBy('shopping.imageUrl')
            .addGroupBy('shopping.description')
            .getRawMany();
    
        return queryResult.map(result => ({
            idProduct: result.idProduct,
            redeemedAmount: parseInt(result.redeemedAmount, 10),
            pointsProduct: parseFloat(result.pointsProduct),
            total: parseFloat(result.total),
            idUser: result.idUser,
            imageUrl: result.imageUrl,
            description: result.description,
        }));
    }
}
