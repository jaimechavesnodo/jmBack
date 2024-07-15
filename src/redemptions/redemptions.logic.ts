import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { RedemptionsService } from './redemptions.service';
import { PointClientService } from 'point-client/point-client.service';
import { CreateRedemptionDto } from './dto/create-redemption';
import { CustomerRedemptions } from './entities/redemptions.entity';
import { PointClientLogic } from 'point-client/point-client.logic';


@Injectable()
export class RedemptionsLogic {
    constructor( 
        private readonly redemptionsService: RedemptionsService,
        private readonly pointClientService: PointClientService,
        private readonly pointClientLogic: PointClientLogic
    ) {}

    async createRedeemtion(createRedemptionDtoOrList: CreateRedemptionDto | CreateRedemptionDto[]): Promise<CustomerRedemptions | CustomerRedemptions[]> {
        if (Array.isArray(createRedemptionDtoOrList)) {
            // Si es una lista de objetos
            const createdRedemptions: CustomerRedemptions[] = [];
            
            for (const createRedemptionDto of createRedemptionDtoOrList) {
                const createdRedemption = await this.createSingleRedeemtion(createRedemptionDto);
                createdRedemptions.push(createdRedemption);
            }
            
            return createdRedemptions;
        } else {
            // Si es un solo objeto
            return this.createSingleRedeemtion(createRedemptionDtoOrList);
        }
    }

    private async createSingleRedeemtion(createRedemptionDto: CreateRedemptionDto): Promise<CustomerRedemptions> {
        const { idUser, pointsProduct } = createRedemptionDto;

        const clientPoints = await this.pointClientService.findOne(idUser);
        if (!clientPoints || clientPoints.pointsCurrent < pointsProduct) {
            throw new HttpException('Insufficient points', HttpStatus.BAD_REQUEST);
        }

        await this.pointClientLogic.deductPoints(idUser, pointsProduct);
        return this.redemptionsService.create(createRedemptionDto);
    }
}