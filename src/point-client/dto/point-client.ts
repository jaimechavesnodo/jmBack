import { IsInt, IsString, IsDecimal } from "class-validator";

export class PointClientDto {

    @IsDecimal()
    pointsCurrent: number; 

    @IsDecimal()
    PointsAccumulatedPreviousMonth: number;

    @IsDecimal()
    pointsToExpire: number; 
    
    @IsInt()
    idUser: number;
}