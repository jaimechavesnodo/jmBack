import { IsInt, IsNumber, IsString } from "class-validator";

export class GetShoppingCart {

    @IsInt()
    idProduct: number;

    @IsString()
    imageUrl: string;

    @IsString()
    description: string;

    @IsNumber()
    pointsProduct: number;

    @IsInt()
    redeemedAmount: number;

    @IsNumber()
    total: number;

    @IsInt()
    idUser: number;

}
