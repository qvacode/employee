import { CreateUserDto, UserPrimitiveData } from "../../users/domain/user.entity";
import { LoginUserDto, UserLogged } from "./auth.entity";

export abstract class AuthRepository {
    abstract login(data: LoginUserDto): Promise<UserLogged>
    abstract register(user: CreateUserDto ): Promise<UserPrimitiveData>
}