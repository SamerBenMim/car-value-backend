import { IsEmail, IsString } from "class-validator";
export class CreateUserDto{
    @IsString()
    password: string;
    @IsEmail()
    email: string;
}