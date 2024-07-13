import { IsInt, IsString } from "class-validator";

export class SubcategoriesDto {
  @IsInt()
  id: number;
  
  @IsString()
  name: string;

  @IsString()
  imageUrl: string;

  @IsInt()
  idcategories: number;

}
