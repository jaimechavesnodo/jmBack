import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedemptionsCustomerDto } from './dto/customer-redemptions'
import { CustomerRedemptions } from './entities/redemptions.entity';
import { CreateRedemptionDto } from './dto/create-redemption';


@Injectable()
export class RedemptionsService {
    constructor(
        @InjectRepository(CustomerRedemptions)
    private redemptionRepository: Repository<CustomerRedemptions>,
    ) {}

    async findAll(params: RedemptionsCustomerDto, idUser: number): Promise<CustomerRedemptions[]> {
        const { orderName, redemptionDate, page, limit } = params;
        const skip = page * limit;
        
        let qb = this.redemptionRepository.createQueryBuilder('redemption');
        if (orderName) {
            qb = qb.andWhere('redemption.orderName = :orderName', { orderName });
        }
        if (redemptionDate) {
            qb = qb.andWhere('redemption.redemptionDate = :redemptionDate', { redemptionDate });
        }
        
        qb = qb.andWhere('redemption.idUser = :idUser', { idUser });
    
        qb = qb.skip(skip).take(limit);
        return qb.getMany();
    }
    

    async create(createRedemptionDto: CreateRedemptionDto): Promise<CustomerRedemptions> {
        const redemption = this.redemptionRepository.create(createRedemptionDto);
        return this.redemptionRepository.save(redemption);
    }
}