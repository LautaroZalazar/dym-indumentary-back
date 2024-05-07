import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginBodyDTO {
    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsEmail()
    email: string;
}