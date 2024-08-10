import { CreateUserDto, UserPrimitiveData, User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';

export class UserInMemoryRepository implements UserRepository {
    private users: UserPrimitiveData[] = [];

    public async create(user: User): Promise<void> {
        this.users.push(user.toValue());
    }

    public async findById(id: string): Promise<UserPrimitiveData | null> {
        const user = this.users.find((user) => user.id === id);
        return user || null;
    }

    public async findAll(): Promise<UserPrimitiveData[] | []> {
        return this.users;
    }
    
    public async update(id: string, data: Partial<CreateUserDto>): Promise<UserPrimitiveData | null> {
        const userIndex = this.users.findIndex((user) => user.id === id);

        if (userIndex === -1) return null;

        this.users[userIndex] = {
            ...this.users[userIndex],
            ...data,
        };

        return this.users[userIndex];  
    }
}
