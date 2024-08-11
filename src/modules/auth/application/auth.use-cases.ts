import { DomainExceptions } from "../../../common/domain/exceptions";
import { Utility } from "../../../common/utility";
import { UserPrimitiveData, UserStatus } from "../../users/domain/user.entity";
import { UserRepository } from "../../users/domain/user.repository";
import { Auth, LoginUserDto, RegisterUserDto, UserLogged } from "../domain/auth.entity";
import { AuthRepository } from "../domain/auth.repository";

export class AuthUseCases implements AuthRepository{
    constructor(private readonly userRepository: UserRepository) {}

    async login(data: LoginUserDto): Promise<UserLogged> {
        const { email, password } = data
        const user = await this.userRepository.findByEmail(email)
        if(!user) throw new DomainExceptions('Invalid email or password!', 401)
        if(user.status === UserStatus.INACTIVE) throw new DomainExceptions('Inactive user. Wait to be activated!', 401)
            
        const isValidPassword = await Utility.validatePassword(password, user.password)
        if(!isValidPassword) throw new DomainExceptions('Invalid email or password!', 401)

        const token = Utility.generateToken(user.id, user.role)

        const { password: _, ...rest} = user
        return {
            ...rest,
            token
        }    
    }

    async register(user: RegisterUserDto): Promise<UserPrimitiveData> {
        const userExist = await this.userRepository.findByEmail(user.email)
        if(userExist) throw new DomainExceptions('Email already in use!', 409)

        const hashedPassword = await Utility.hashPassword(user.password);
        user.password = hashedPassword

        const newUser = Auth.create(user)
        await this.userRepository.create(newUser)

        return newUser.toValue()
    }
}