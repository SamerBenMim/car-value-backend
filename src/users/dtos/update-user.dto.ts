import { IsEmail, IsString, IsOptional } from "class-validator";
export class UpdateUserDto{
    @IsOptional()
    @IsString()
    password: string;
    @IsOptional()
    @IsEmail()
    email: string;
}