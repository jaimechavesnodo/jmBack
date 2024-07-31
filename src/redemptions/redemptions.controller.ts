import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { RedemptionsLogic } from './redemptions.logic';
import { RedemptionsService } from './redemptions.service';
import { RedemptionsCustomerDto } from './dto/customer-redemptions'
import { CustomerRedemptions } from './entities/redemptions.entity';
import { CreateRedemptionDto } from './dto/create-redemption';
import { GetRedemptionDto } from './dto/get-redemptions';


@Controller('Redemptions')
export class RedemptionsController {
    constructor(private readonly redemptionsService: RedemptionsService, private readonly redemptionsLogic: RedemptionsLogic) { }

    @Get('getRedemptionsCustomer/:idUser')
    findAll( @Param('idUser') idUser: number, @Query() params: RedemptionsCustomerDto): Promise<GetRedemptionDto[]> {
        return this.redemptionsService.findAll(params, idUser);
    }

    @Post('CreateRedeemtion')
    async createRedeemtion(@Body() createRedemptionDtoOrList: CreateRedemptionDto | CreateRedemptionDto[]): Promise<CustomerRedemptions | CustomerRedemptions[]> {
        return this.redemptionsLogic.createRedeemtion(createRedemptionDtoOrList);
    }
}