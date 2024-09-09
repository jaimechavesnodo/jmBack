import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { RedemptionsService } from './redemptions.service';
import { PointClientService } from 'point-client/point-client.service';
import { CreateRedemptionDto } from './dto/create-redemption';
import { CustomerRedemptions } from './entities/redemptions.entity';
import { PointClientLogic } from 'point-client/point-client.logic';
import Decimal from 'decimal.js';

@Injectable()
export class RedemptionsLogic {
    constructor( 
        private readonly redemptionsService: RedemptionsService,
        private readonly pointClientService: PointClientService,
        private readonly pointClientLogic: PointClientLogic
    ) {}

    async createRedeemtion(createRedemptionDtoOrList: CreateRedemptionDto | CreateRedemptionDto[]): Promise<CustomerRedemptions | CustomerRedemptions[]> {
        if (Array.isArray(createRedemptionDtoOrList)) {

            const createdRedemptions: CustomerRedemptions[] = [];
            
            for (const createRedemptionDto of createRedemptionDtoOrList) {
                const createdRedemption = await this.createSingleRedeemtion(createRedemptionDto);
                createdRedemptions.push(createdRedemption);
            }
            
            return createdRedemptions;
        } else {
            return this.createSingleRedeemtion(createRedemptionDtoOrList);
        }
    }


    private async createSingleRedeemtion(createRedemptionDto: CreateRedemptionDto): Promise<CustomerRedemptions> {
        const { idUser, pointsProduct, redeemedAmount } = createRedemptionDto;
    
        const pointsProductDecimal = new Decimal(pointsProduct);
        const redeemedAmountDecimal = new Decimal(redeemedAmount);
        const totalPointsToDeduct = pointsProductDecimal.times(redeemedAmountDecimal).toNumber();
    
        const clientPoints = await this.pointClientService.findOne(idUser);
        if (!clientPoints || clientPoints.pointsCurrent < totalPointsToDeduct) {
            throw new HttpException('Insufficient points', HttpStatus.BAD_REQUEST);
        }
    
        await this.pointClientLogic.deductPoints(idUser, totalPointsToDeduct);
    
        return this.redemptionsService.create(createRedemptionDto);
    }

    // private async createSingleRedeemtion(createRedemptionDto: CreateRedemptionDto): Promise<CustomerRedemptions> {
    //     const { idUser, pointsProduct, redeemedAmount } = createRedemptionDto;
    
    //     // Calcula el total de puntos a deducir
    //     const totalPointsToDeduct = pointsProduct * redeemedAmount;
    
    //     const clientPoints = await this.pointClientService.findOne(idUser);
    //     if (!clientPoints || clientPoints.pointsCurrent < totalPointsToDeduct) {
    //         throw new HttpException('Insufficient points', HttpStatus.BAD_REQUEST);
    //     }
    
    //     // Deduct the total points
    //     await this.pointClientLogic.deductPoints(idUser, totalPointsToDeduct);
    
    //     return this.redemptionsService.create(createRedemptionDto);
    // }
    
}