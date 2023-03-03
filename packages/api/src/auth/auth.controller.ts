import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service.js";
import { LocalAuthGuard } from "./strategies/guards/local-auth.guard.js";

@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request) {
        return this.authService.login(req.user as any);
    }
}
