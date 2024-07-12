import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductLogic } from './product.logic';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductService,ProductLogic],
    controllers: [ProductController],
  })
    export class ProductModule {}