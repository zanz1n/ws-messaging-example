import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { compare, genSalt, hash } from "bcryptjs";
import { GlobalConfig } from "@/GlobalConfig";
import { PrismaService } from "@/prisma/prisma.service";
import { v4 as uuid } from "uuid";

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

    async register(username: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                username                
            },
            select: { id: true }
        });

        if (user) throw new UnauthorizedException("User already exists");

        const salt = await genSalt(GlobalConfig.BCryptSalt);
        const hashedPassword = await hash(password, salt);

        const newUser = await this.prisma.user.create({
            data: {
                id: uuid(),
                username,
                password: hashedPassword
            }
        });

        return newUser;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
