import { IsInt, IsString } from 'class-validator';

export class EmailUserDto {
    @IsString()
    secondaryEmail: string;
}