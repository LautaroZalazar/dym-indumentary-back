import { IAuthService } from "../../../../auth/domain/services/auth.interface.service";
import SymbolsAuth from "../../../../auth/symbols-auth";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { LoginBodyDTO } from "../dtos/auth.dto";

@Controller('auth')

export class authController {
    constructor(@Inject(SymbolsAuth.IAuthService) private readonly authService: IAuthService) { }
    @Post('login')
    async logIn(@Body() body: LoginBodyDTO) {
        return await this.authService.logIn(body)
    }
}