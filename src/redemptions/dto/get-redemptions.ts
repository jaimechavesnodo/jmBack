import { IsInt, IsNumber, IsString } from "class-validator";
import { In } from "typeorm";

export class GetRedemptionDto {
    @IsInt()
    id: number

    @IsString()
    orderName: string;

    @IsString()
    redemptionDate: string;

    @IsNumber()
    pointsProduct: number;

    @IsInt()
    idUser: number;

    @IsInt()
    redeemedAmount: number;
}
