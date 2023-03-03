import { BadGatewayException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { GlobalConfig } from "@/GlobalConfig";
import { UserJwtPayloadDto } from "../types/user-jwt-payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: GlobalConfig.JwtSecret,
        });
    }

    async validate(payload: unknown): Promise<UserJwtPayloadDto> {
        if (
            payload
            && typeof payload == "object"
            && "sub" in payload
            && typeof payload["sub"] == "string"
            && "username" in payload
            && typeof payload["username"] == "string"
        ) {
            return { id: payload.sub, username: payload.username };
        }
        throw new BadGatewayException("Invalid JWT payload");
    }
}
