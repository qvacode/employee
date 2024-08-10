import { Utility } from '../../../common/utility';
import { UserPrimitiveData, CreateUserDto, User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';

export class UserUseCases {
    constructor(private readonly repository: UserRepository) {}

    public create = async (user: CreateUserDto): Promise<UserPrimitiveData> => {
        const hashedPassword = await Utility.hashPassword(user.password);
        user.password = hashedPassword;
        const newUser = User.create(user);

        await this.repository.create(newUser);

        return newUser.toValue();
    };

    public findById = async (id: string): Promise<UserPrimitiveData | null> => {
        const user = await this.repository.findById(id);
        if (!user) return null;

        return user;
    };

    public findAll = async (): Promise<UserPrimitiveData[]> => {
        return await this.repository.findAll();
    };

    public update = async (id: string, data: Partial<CreateUserDto>): Promise<UserPrimitiveData | null> => {
        const user = await this.repository.findById(id);

        if (!user) return null;

        const userUpdated = await this.repository.update(id, data);
        if (!userUpdated) return null;

        return userUpdated;
    }
}
