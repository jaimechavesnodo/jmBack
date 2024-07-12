import { IsInt, IsString } from 'class-validator';

export class LoginDto {

    @IsInt()
    idUser: number;

    @IsString()
    password: string;

    @IsString()
    identification: string;
}