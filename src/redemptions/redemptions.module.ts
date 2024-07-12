import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedemptionsService } from './redemptions.service';
import { RedemptionsLogic } from './redemptions.logic';
import { RedemptionsController } from './redemptions.controller';
import { CustomerRedemptions } from './entities/redemptions.entity';
import { PointClientModule } from '../point-client/point-client.module';  


@Module({
    imports: [TypeOrmModule.forFeature([CustomerRedemptions]),
    PointClientModule],
    providers: [RedemptionsService,RedemptionsLogic],
    controllers: [RedemptionsController],
  })
  export class RedemptionsModule {}