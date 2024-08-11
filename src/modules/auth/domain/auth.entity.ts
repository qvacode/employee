import { Payload, Utility } from "../../../common/utility";
import { CreateUserDto, User, UserPrimitiveData, UserRole, UserStatus } from '../../users/domain/user.entity';

export interface UserLogged extends Omit<UserPrimitiveData, 'password'> {
    token: Payload | string
}

export interface LoginUserDto extends Pick<UserPrimitiveData, 'email' | 'password'> {}
export interface RegisterUserDto extends Omit<CreateUserDto, 'role' | 'status'> {}

export class Auth extends User {
    constructor(user: UserPrimitiveData) {
        super(user)
    }

    /**
     * @Override
     */
    public static create(user: RegisterUserDto): User {
        return new User({
            id: Utility.generateId(),
            department: user.department,
            email: user.email,
            name: user.name,
            password: user.password,
            position: user.position,
            role: UserRole.EMPLOYEE,
            status: UserStatus.INACTIVE
        })
    }
}