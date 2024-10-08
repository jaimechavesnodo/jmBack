import { IsInt, IsString } from 'class-validator';

export class LoginDto {

    @IsString()
    password: string;

    @IsString()
    identification: string;
}