import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PointClientService } from './point-client.service';
import { pointClient } from './entities/point-client.entity';


@Injectable()
export class PointClientLogic {
    constructor( 
        private readonly pointClientService: PointClientService
    ) {}

    async deductPoints(idUser: number, pointsProduct: number): Promise<void> {
        const client = await this.pointClientService.findOne(idUser);
        if (!client) {
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
        }
    
        if (client.pointsCurrent < pointsProduct) {
        throw new HttpException('Insufficient points', HttpStatus.BAD_REQUEST);
        }
    
        client.pointsCurrent -= pointsProduct;
        await this.pointClientService.save(client);
    }
}