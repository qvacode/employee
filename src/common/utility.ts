import { v4 as uuid } from "uuid";

export class Utility {
    public static generateId(): string {
        return uuid()
    }
}
