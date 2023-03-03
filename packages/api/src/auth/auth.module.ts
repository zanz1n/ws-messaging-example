import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { GlobalConfig } from "src/GlobalConfig";
import { JwtStrategy } from "./strategies/jwt.strategy";

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
