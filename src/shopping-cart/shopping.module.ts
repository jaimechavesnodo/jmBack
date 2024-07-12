import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingService } from './shopping.service';
import { ShoppingLogic } from './shopping.logic';
import { ShoppingController } from './shopping.controller';
import { ShoppingCart } from './entities/shopping.entity';


@Module({
    imports: [TypeOrmModule.forFeature([ShoppingCart])],
    providers: [ShoppingService,ShoppingLogic],
    controllers: [ShoppingController],
  })
    export class ShoppingModule {}