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

    async CreateRedeemtion(createRedemptionDto: CreateRedemptionDto): Promise<CustomerRedemptions> {
    const { idUser, pointsProduct } = createRedemptionDto;

    // Obtener puntos actuales del cliente
    const clientPoints = await this.pointClientService.findOne(idUser);
    if (clientPoints.pointsCurrent < pointsProduct) {
    throw new HttpException('Insufficient points', HttpStatus.BAD_REQUEST);
    }

    await this.pointClientLogic.deductPoints(idUser, pointsProduct);
    return this.redemptionsService.create(createRedemptionDto);
    }
}