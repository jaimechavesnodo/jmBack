import { IsInt, IsNumber, IsString } from "class-validator";

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
}
