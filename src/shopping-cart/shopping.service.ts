import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './entities/shopping.entity';



@Injectable()
export class ShoppingService {
    constructor(
        @InjectRepository(ShoppingCart)
    private shoppingRepository: Repository<ShoppingCart>,
    ) {}

    findAll(idUser: number): Promise<ShoppingCart[]> {
        return this.shoppingRepository.find ({ where: { idUser: idUser },});
    } 

    findOne( id: number ): Promise<ShoppingCart> {
        return this.shoppingRepository.findOneBy({ id });
    }

    async deleteProduct(idUser: number, idProduct: number): Promise<void> {
        const result = await this.shoppingRepository.delete({ idUser, idProduct });
    
        if (result.affected === 0) {
        throw new NotFoundException(`Product with ID ${idProduct} not found in the shopping cart for user with ID ${idUser}`);
        }
    }
}
