import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { CatalogueLogic } from './catalogue.logic';
import {CatalogueDto } from './dto/catalogue-redeemable'


@Controller('Catalogue')
export class CatalogueController {
    constructor(private readonly catalogueService: CatalogueService, private readonly catalogueLogic: CatalogueLogic) { }

    @Get('getRedemptionsCustomer/id')
    findOne(@Param('id') id: number): Promise<CatalogueDto> {
            return this.catalogueService.findOne(id);
    }
}