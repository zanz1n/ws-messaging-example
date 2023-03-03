import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service.js";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async validateUser(username: string, pass: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { username }
        });

        if (user && (await compare(pass, user.password))) {
            return user;
        }

        return null;
    }
}
