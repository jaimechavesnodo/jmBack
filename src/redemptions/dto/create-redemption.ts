import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateRedemptionDto {
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
