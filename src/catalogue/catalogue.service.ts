import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalogue } from './entities/catalogue.entity';

@Injectable()
export class CatalogueService {
    constructor(
        @InjectRepository(Catalogue)
    private catalogueRepository: Repository<Catalogue>,
    ) {}

    findAll(): Promise<Catalogue[]> {
        return this.catalogueRepository.find();
    } 

    findOne( id: number ): Promise<Catalogue> {
        return this.catalogueRepository.findOneBy({ id });
    }
}