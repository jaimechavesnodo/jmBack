import { IsString } from "class-validator";

export class RecoverPasswordDto {
    @IsString()
    password: string;
}