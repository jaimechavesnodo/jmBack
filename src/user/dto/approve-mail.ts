import { IsString, IsEmail } from 'class-validator';

export class ApproveEmailDto {
  @IsString()
  name: string;

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
