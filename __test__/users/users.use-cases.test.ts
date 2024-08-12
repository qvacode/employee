import { UserUseCases } from '../../src/modules/users/application/user.use-cases';
import { UserRepository } from '../../src/modules/users/domain/user.repository';
import { UserInMemoryRepository } from '../../src/modules/users/infrastructure/repositories/in-memory.repository';
import { CreateUserDto, UserRole, UserStatus } from '../../src/modules/users/domain/user.entity';


describe('UserUseCases', () => {
    let userUseCases: UserUseCases;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserInMemoryRepository();
        userUseCases = new UserUseCases(userRepository);
    });

    test('should create a new user with hashed password', async () => {
        const password = 'abc123';
        const createUserDto: CreateUserDto = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password,
            department: 'IT',
            position: 'Developer',
            role: UserRole.EMPLOYEE,
            status: UserStatus.ACTIVE,
        };

        const newUser = await userUseCases.create(createUserDto);

        expect(newUser.name).toBe(createUserDto.name);
        expect(newUser.email).toBe(createUserDto.email);
        expect(newUser.password).not.toBe(password)
    });
    

    test('should return the user with the specified id', async () => {
        const user = {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'abc123',
        };

        userRepository.findById = jest.fn().mockResolvedValue(user);

        const foundUser = await userUseCases.findById(user.id);

        expect(foundUser).toEqual(user);
    });

    test('should return null if user with the specified id is not found', async () => {
        const userId = '1';

        userRepository.findById = jest.fn().mockResolvedValue(null);

        const foundUser = await userUseCases.findById(userId);

        expect(foundUser).toBeNull();
    });
    
    test('should return an array of users', async () => {
        const users = [
            {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'abc123',
            },
            {
                id: '2',
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: 'def456',
            },
        ];

        userRepository.findAll = jest.fn().mockResolvedValue(users);

        const allUsers = await userUseCases.findAll();

        expect(allUsers).toEqual(users);
    });

    describe('update', () => {
        test('should update the user with the specified id', async () => {
            const userId = '1';
            const updateUserDto = {
                name: 'John Doe',
                email: 'john.doe@example.com',
            };

            const updatedUser = {
                id: userId,
                name: updateUserDto.name,
                email: updateUserDto.email,
                password: 'abc123',
            };

            userRepository.findById = jest.fn().mockResolvedValue(updatedUser);
            userRepository.update = jest.fn().mockResolvedValue(updatedUser);

            const result = await userUseCases.update(userId, updateUserDto);

            expect(result).toEqual(updatedUser);
        });

        test('should return null if user with the specified id is not found', async () => {
            const userId = '1';
            const updateUserDto = {
                name: 'John Doe',
                email: 'john.doe@example.com',
            };

            userRepository.findById = jest.fn().mockResolvedValue(null);

            const result = await userUseCases.update(userId, updateUserDto);

            expect(result).toBeNull();
        });
    });
});