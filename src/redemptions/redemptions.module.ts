import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedemptionsService } from './redemptions.service';
import { RedemptionsLogic } from './redemptions.logic';
import { RedemptionsController } from './redemptions.controller';
import { CustomerRedemptions } from './entities/redemptions.entity';


@Module({
    imports: [TypeOrmModule.forFeature([CustomerRedemptions])],
    providers: [RedemptionsService,RedemptionsLogic],
    controllers: [RedemptionsController],
  })
  export class RedemptionsModule {}