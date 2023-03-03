import { User } from "@prisma/client";

export abstract class UserJwtPayloadDto {
    id: string;
    username: string;
}

export type JwtGuardedRequest<T extends Request> = T & {
    user: UserJwtPayloadDto;
}

export type LocalGuardedRequest<T extends Request> = T & {
    user: User;
}
