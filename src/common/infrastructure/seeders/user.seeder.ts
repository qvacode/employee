import { CreateUserDto, UserRole, UserStatus } from "../../../modules/users/domain/user.entity";
import { userUseCases } from "../../../modules/users/infrastructure/dependencies-injection";

export async function seedUsers() {
    const users = await userUseCases.findAll()
    if(users.length) return
    
    const admin: CreateUserDto = {
        department: '0cd023f3-9f36-46f0-ae08-dbcba7c4434d',
        email: 'admin@example.com',
        name: 'ADMINISTRATOR',
        password: 'qwerty123',
        position: 'ADMIN',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE
    }

    const manager: CreateUserDto = {
        department: '0cd023f3-9f36-46f0-ae08-dbcba7c4434d',
        email: 'manager@example.com',
        name: 'MANAGER',
        password: 'qwerty123',
        position: 'MANAGER',
        role: UserRole.MANAGER,
        status: UserStatus.ACTIVE
    }

    await userUseCases.create(admin)
    await userUseCases.create(manager)
}