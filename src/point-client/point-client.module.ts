import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointClientService } from './point-client.service';
import { PointClientLogic } from './point-client.logic';
import { PointClientController } from './point-client.controller';
import { pointClient } from './entities/point-client.entity';


@Module({
    imports: [TypeOrmModule.forFeature([pointClient])],
    providers: [PointClientService,PointClientLogic],
    controllers: [PointClientController],
  })
  export class PointClientModule {}