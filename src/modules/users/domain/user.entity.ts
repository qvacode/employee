import { Utility } from '../../../common/utility';

export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    EMPLOYEE = 'employee',
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    REMOVED = 'removed',
}

export interface UserPrimitiveData {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    password: string;
    status: UserStatus;
    position: string;
    department: string;
}

export interface CreateUserDto extends Omit<UserPrimitiveData, 'id'> {}

export class User {
    constructor(private readonly user: UserPrimitiveData) {}

    public static create(createUser: CreateUserDto) {
        return new User({
            id: Utility.generateId(),
            name: createUser.name,
            email: createUser.email,
            role: createUser.role,
            password: createUser.password,
            status: createUser.status,
            position: createUser.position,
            department: createUser.department,
        });
    }

    public toValue(): UserPrimitiveData {
        return {
            id: this.user.id,
            name: this.user.name,
            email: this.user.email,
            role: this.user.role,
            password: this.user.password,
            status: this.user.status,
            position: this.user.position,
            department: this.user.department,
        };
    }
}
