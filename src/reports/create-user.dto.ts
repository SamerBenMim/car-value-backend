import { IsString, IsNumber, Min, Max,IsLatitude,isLatitude, IsLongitude } from 'class-validator';

export class CreateReportDto {
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;
    @IsString()

    make: string;
    @IsString()
    model: string;
    @IsNumber()
    @Min(1900)
    @Max(2050)
    year: number;
    @IsNumber()
    @IsLongitude()
    lng: number;
    @IsNumber()
    @IsLatitude()
    lat: number;
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
}