import { CreateUserDto, UserPrimitiveData, User } from "./user.entity";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>
    abstract findById(id: string): Promise<UserPrimitiveData | null>
    abstract findByEmail(email: string): Promise<UserPrimitiveData | null>
    abstract findAll(): Promise<UserPrimitiveData [] | []>
    abstract update(id: string, data: Partial<CreateUserDto>): Promise<UserPrimitiveData | null>
}