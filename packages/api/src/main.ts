import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        rawBody: true,
    });

    app.enableCors({
        origin: true
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    await app.listen(3333);
}
bootstrap();
