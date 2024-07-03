import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string; 

    @IsString()
    password: string;

    @IsString()
    lastName: string;
  
    @IsString()
    identification: string;
  
    @IsString()
    phone: string;
    
    @IsString()
    corporateEmail: string; 
  
    @IsString()
    secondaryEmail: string;
  
    @IsString()
    company: string; 
  
    @IsString()
    birthdayDate: string;
  
    @IsString()
    personalPhone: string; 
  
    @IsString()
    role: string;

    @IsString()
    typeDocument: string;
}