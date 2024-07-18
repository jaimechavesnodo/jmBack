import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class RedemptionsCustomerDto {
    @IsOptional()
    @IsString()
    orderName?: string;

    @IsOptional()
    @IsString()
    redemptionDate?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    page: number = 0; 

    @IsOptional()
    @IsInt()
    @Min(1)
    limit: number = 10;  
    
}



