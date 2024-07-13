import { Controller, Get, Param  } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesLogic } from './subcategories.logic';
import { SubcategoriesDto } from './dto/subcategories-catalogo';


@Controller('SubcategoriesCatalogo')
export class SubcategoriesController {
    constructor(private readonly subcategoriesService: SubcategoriesService, private readonly subcategoriesLogic: SubcategoriesLogic) { }


  @Get('getSubCategoriesCatalogue/:id')
  findOne(@Param('id') id: number): Promise<SubcategoriesDto> {
  return this.subcategoriesService.findOne(id);
  }
}