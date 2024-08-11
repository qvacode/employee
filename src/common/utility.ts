import { v4 as uuid } from "uuid";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";

import { Env } from "../config/env.config";
import { DomainExceptions } from "./domain/exceptions";
import { UserRole } from "../modules/users/domain/user.entity";

export type Payload = jwt.JwtPayload

export class Utility {
    private static readonly JWT_SECRET = Env.JWT_SECRET
    private static readonly JWT_EXPIRATION = Env.JWT_EXPIRATION
    
    public static generateId(): string {
        return uuid();
    }
    
    public static async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await hash(password, saltRounds);
    }

    public static async validatePassword(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }

    public static generateToken(userId: string, role: UserRole): string {
        return jwt.sign({ id: userId, role }, this.JWT_SECRET, {
            expiresIn: this.JWT_EXPIRATION,
        });
    }

    public static validateToken(token: string): string | object {
        try {
            return jwt.verify(token, this.JWT_SECRET);
        } catch (error) {
            throw new DomainExceptions('Invalid or expired token', 401);
        }
    }
}
