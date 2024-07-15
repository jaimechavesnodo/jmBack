import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { RedemptionsLogic } from './redemptions.logic';
import { RedemptionsService } from './redemptions.service';
import { RedemptionsCustomerDto } from './dto/customer-redemptions'
import { CustomerRedemptions } from './entities/redemptions.entity';
import { CreateRedemptionDto } from './dto/create-redemption';


@Controller('Redemptions')
export class RedemptionsController {
    constructor(private readonly redemptionsService: RedemptionsService, private readonly redemptionsLogic: RedemptionsLogic) { }

    @Get('getRedemptionsCustomer')
    findAll(@Query() params: RedemptionsCustomerDto): Promise<CustomerRedemptions[]> {
        return this.redemptionsService.findAll(params);
    }

    @Post('CreateRedeemtion')
    async createRedeemtion(@Body() createRedemptionDtoOrList: CreateRedemptionDto | CreateRedemptionDto[]): Promise<CustomerRedemptions | CustomerRedemptions[]> {
        return this.redemptionsLogic.createRedeemtion(createRedemptionDtoOrList);
    }
}