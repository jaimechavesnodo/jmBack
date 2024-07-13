import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoriesCatalogo } from './entities/subcategories.entity';
import { SubcategoriesLogic } from './subcategories.logic';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';


@Module({
    imports: [TypeOrmModule.forFeature([SubcategoriesCatalogo])],
    providers: [SubcategoriesService,SubcategoriesLogic],
    controllers: [SubcategoriesController],
  })
    export class SubcategoriesCatalogoModule {}