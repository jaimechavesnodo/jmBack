import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { pointClient } from './entities/point-client.entity';

@Injectable()
export class PointClientService {
    constructor(
        @InjectRepository(pointClient)
    private PointClientRepository: Repository<pointClient>,
    ) {}

    findAll(): Promise<pointClient[]> {
        return this.PointClientRepository.find();
    } 

    findOne( id: number ): Promise<pointClient> {
        return this.PointClientRepository.findOneBy({ id });
    }
    
    findOneBy( id: number ): Promise<pointClient> {
        return this.PointClientRepository.findOneBy({ id });
    }

    async save(client: pointClient): Promise<pointClient> {
        return this.PointClientRepository.save(client);
    }
}