import { IsString } from "class-validator";

export class ProductCartDto {
  @IsString()
  idProduct: string;

  @IsString()
  redeemedAmount: number;

  @IsString()
  points: string;

  @IsString()
  total: string;

}
