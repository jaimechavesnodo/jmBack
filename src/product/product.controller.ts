import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product-catalogue';

@Controller('Products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get('getProductsCatalogue/:idRedeemable')
    findAll(@Param('idRedeemable') idRedeemable: number): Promise<ProductDto[]> {
      return this.productService.findAll(idRedeemable);
    }
}