import { UserRepository } from '../../../domain/user.repository';
import { CreateUserDto, User, UserPrimitiveData } from '../../../domain/user.entity';
import { UserModel } from './user.schema';

export class MongoUserRepository implements UserRepository {
    async create(user: User): Promise<void> {
        const userData = new UserModel(user.toValue());
        await userData.save();
    }

    async findById(id: string): Promise<UserPrimitiveData | null> {
        const user = await UserModel.findOne({ id }).exec();
        return user ? user.toObject() : null;
    }

    async findByEmail(email: string): Promise<UserPrimitiveData | null> {
        const user = await UserModel.findOne({ email }).exec();
        return user ? user.toObject() : null;
    }

    async findAll(): Promise<UserPrimitiveData[] | []> {
        const users = await UserModel.find().exec();
        return users.map(user => user.toObject());
    }

    async update(id: string, data: Partial<CreateUserDto>): Promise<UserPrimitiveData | null> {
        const user = await UserModel.findOneAndUpdate(
            { id },
            { $set: data },
            { new: true }
        ).exec();

        return user ? user.toObject() : null;
    }
}
