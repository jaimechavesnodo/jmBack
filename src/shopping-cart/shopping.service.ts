import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './entities/shopping.entity';



@Injectable()
export class ShoppingService {
    constructor(
        @InjectRepository(ShoppingCart)
    private shoppingRepository: Repository<ShoppingCart>,
    ) {}

    findAll(): Promise<ShoppingCart[]> {
        return this.shoppingRepository.find();
    } 

    findOne( id: number ): Promise<ShoppingCart> {
        return this.shoppingRepository.findOneBy({ id });
    }
}