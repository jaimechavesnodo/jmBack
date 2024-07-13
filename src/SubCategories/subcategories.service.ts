import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubcategoriesCatalogo } from './entities/subcategories.entity';


@Injectable()
export class SubcategoriesService {
    constructor(
        @InjectRepository(SubcategoriesCatalogo)
    private shoppingRepository: Repository<SubcategoriesCatalogo>,
    ) {}

    findAll(): Promise<SubcategoriesCatalogo[]> {
        return this.shoppingRepository.find();
    } 

    findOne( id: number ): Promise<SubcategoriesCatalogo> {
        return this.shoppingRepository.findOneBy({ id });
    }
}