import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { AppGateway } from "./app.gateway";

@Module({
    imports: [PrismaModule, AuthModule],
    providers: [AppGateway]
})
export class AppModule {}
