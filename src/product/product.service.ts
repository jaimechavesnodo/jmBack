import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
    private productRepository: Repository<Product>,
    ) {}
    
    async findAll(idRedeemable: number): Promise<Product[]> {
        return this.productRepository.find({ where: { idRedeemable: idRedeemable } });
    }
    

    findOne( id: number ): Promise<Product> {
        return this.productRepository.findOneBy({ id });
    }
}