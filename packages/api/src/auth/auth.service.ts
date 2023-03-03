import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service.js";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { username }
        });

        if (user && (await compare(pass, user.password))) {
            return user;
        }

        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
