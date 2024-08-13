import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedemptionsCustomerDto } from './dto/customer-redemptions'
import { CustomerRedemptions } from './entities/redemptions.entity';
import { CreateRedemptionDto } from './dto/create-redemption';
import { GetRedemptionDto } from './dto/get-redemptions';


@Injectable()
export class RedemptionsService {
    constructor(
        @InjectRepository(CustomerRedemptions)
    private redemptionRepository: Repository<CustomerRedemptions>,
    ) {}

    async findAll(params: RedemptionsCustomerDto, idUser: number): Promise<GetRedemptionDto[]> {
    const { orderName = '', redemptionDate, page, limit } = params;
    const skip = page * limit;
    
    let qb = this.redemptionRepository.createQueryBuilder('redemption');

    if (orderName) {
        qb = qb.andWhere('redemption.orderName LIKE :orderName', { orderName: `%${orderName}%` });
    }

    if (redemptionDate) {
        qb = qb.andWhere('redemption.redemptionDate = :redemptionDate', { redemptionDate });
    }

    qb = qb.andWhere('redemption.idUser = :idUser', { idUser });

    qb = qb.orderBy('redemption.id', 'DESC');

    qb = qb.skip(skip).take(limit);
    
    const redemptions = await qb.getMany();

    return redemptions.map(redemption => ({
        id: redemption.id,
        orderName: redemption.orderName,
        redemptionDate: redemption.redemptionDate.toISOString().split('T')[0],
        pointsProduct: redemption.pointsProduct,
        idUser: redemption.idUser,
        redeemedAmount: redemption.redeemedAmount
    }));
}

    

    async create(createRedemptionDto: CreateRedemptionDto): Promise<CustomerRedemptions> {
        const redemption = this.redemptionRepository.create(createRedemptionDto);
        return this.redemptionRepository.save(redemption);
    }
}