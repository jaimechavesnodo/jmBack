import { IsString } from "class-validator";

export class PointClientDto {
    @IsString()
    pointsCurrent: string;

    @IsString()
    pointsAccumulated: string;

    @IsString()
    pointsToExpire: string;
}