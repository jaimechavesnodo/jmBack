import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PointClientService } from './point-client.service';
import Decimal from 'decimal.js';


@Injectable()
export class PointClientLogic {
    constructor( 
        private readonly pointClientService: PointClientService
    ) {}

//     async deductPoints(idUser: number, pointsProduct: number): Promise<void> {
//         const client = await this.pointClientService.findOne(idUser);
//         if (!client) {
//         throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
//         }
    
//         if (client.pointsCurrent < pointsProduct) {
//         throw new HttpException('Insufficient points', HttpStatus.BAD_REQUEST);
//         }
    
//         client.pointsCurrent -= pointsProduct;
//         await this.pointClientService.save(client);
//     }

async deductPoints(idUser: number, pointsToDeduct: number): Promise<void> {
        const client = await this.pointClientService.findOne(idUser);
        if (!client) {
            throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
        }

        const pointsToDeductDecimal = new Decimal(pointsToDeduct);
        const clientPointsDecimal = new Decimal(client.pointsCurrent);

        if (clientPointsDecimal.lessThan(pointsToDeductDecimal)) {
            throw new HttpException('Insufficient points', HttpStatus.BAD_REQUEST);
        }

        client.pointsCurrent = clientPointsDecimal.minus(pointsToDeductDecimal).toNumber();
        await this.pointClientService.save(client);
    }
}