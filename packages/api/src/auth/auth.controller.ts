import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./strategies/guards/jwt-auth.guard";
import { LocalAuthGuard } from "./strategies/guards/local-auth.guard";
import { RegisterUserDto } from "./types/register-user-payload.dto";

@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request) {
        return this.authService.login(req.user as User);
    }

    @Post("/register")
    async register(@Body() body: RegisterUserDto) {
        if (body.password !== body.confirmPassword) {
            throw new UnauthorizedException("Passwords do not match");
        }
        return this.authService.register(body.username, body.password);
    }

    @Get("/@me")
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req: Request) {
        return req.user;
    }
}
