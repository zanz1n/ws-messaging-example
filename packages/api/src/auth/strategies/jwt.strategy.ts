import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { GlobalConfig } from "@/GlobalConfig";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: GlobalConfig.JwtSecret,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, username: payload.username };
    }
}
