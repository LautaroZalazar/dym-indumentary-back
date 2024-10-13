import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateOrderDTO {

    @IsString()
    @IsNotEmpty()
    cart: string

    @IsNumber()
    @IsNotEmpty()
    total: number

    @IsEnum(['completed', 'cancelled'])
    @IsNotEmpty()
    status: string
}