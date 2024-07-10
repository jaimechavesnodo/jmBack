import { IsInt, IsString } from "class-validator";

export class CatalogueDto {

    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    imageUrl: string;

    @IsString()
    idcategories: string;
}

