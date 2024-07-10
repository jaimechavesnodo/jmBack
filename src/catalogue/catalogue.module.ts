import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueService } from './catalogue.service';
import { CatalogueLogic } from './catalogue.logic';
import { CatalogueController } from './catalogue.controller';
import { Catalogue } from './entities/catalogue.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Catalogue])],
    providers: [CatalogueService,CatalogueLogic],
    controllers: [CatalogueController],
  })
  export class CatalogueModule {}