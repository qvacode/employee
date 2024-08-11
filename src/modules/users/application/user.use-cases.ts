import { DomainExceptions } from '../../../common/domain/exceptions';
import { Utility } from '../../../common/utility';
import { UserPrimitiveData, CreateUserDto, User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';

export class UserUseCases {
    constructor(private readonly userRepository: UserRepository) {}

    public create = async (user: CreateUserDto): Promise<UserPrimitiveData> => {
        const userExist = await this.userRepository.findByEmail(user.email)
        if(userExist) throw new DomainExceptions('Email already in use!', 409)

        const hashedPassword = await Utility.hashPassword(user.password);
        user.password = hashedPassword;
        const newUser = User.create(user);

        await this.userRepository.create(newUser);

        return newUser.toValue();
    };

    public findById = async (id: string): Promise<UserPrimitiveData> => {
        const user = await this.userRepository.findById(id);
        if (!user) throw new DomainExceptions(`User with id = ${id}, not found!`, 404);

        return user;
    };

    public findAll = async (): Promise<UserPrimitiveData[]> => {
        return await this.userRepository.findAll();
    };

    public update = async (id: string, data: Partial<CreateUserDto>): Promise<UserPrimitiveData> => {
        await this.findById(id);

        const userUpdated = await this.userRepository.update(id, data);
        if (!userUpdated) throw new DomainExceptions('Updated not processed!', 409);

        return userUpdated;
    }
}
