import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module.js";
import { AuthService } from "./auth.service.js";
import { LocalStrategy } from "./strategies/local.strategy.js";
import { AuthController } from "./auth.controller.js";
import { JwtModule } from "@nestjs/jwt";
import { GlobalConfig } from "src/GlobalConfig.js";
import { JwtStrategy } from "./strategies/jwt.strategy.js";

@Module({
    imports: [
        JwtModule.register({
            secret: GlobalConfig.JwtSecret,
            signOptions: { expiresIn: "7d" }
        }),
        PrismaModule,
        PassportModule
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
