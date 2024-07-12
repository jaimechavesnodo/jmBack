import { IsInt, IsString } from "class-validator";

export class ProductDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;
  
    @IsString()
    description: string;
  
    @IsString()
    imageUrl: string;
  
    @IsString()
    pointsValue: string;
  
    @IsInt()
    idRedeemable: number;
  
    @IsString()
    amount: string;
}
