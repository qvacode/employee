import { v4 as uuid } from "uuid";
import { compare, hash } from "bcryptjs";

export class Utility {
    
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
}
