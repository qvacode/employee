import { Request, Response } from 'express';
import { UserUseCases } from '../../application/user.use-cases';
import { ValidationError } from 'joi';
import { UserSchemaValidator } from './user.schema-validator';

export class UserController {
    constructor(private readonly userUseCases: UserUseCases) {}

    public create = async (req: Request, res: Response) => {
        const { name, email, role, password, status, position, department } =
            req.body;

        const user = {
            name,
            email,
            role,
            password,
            status,
            position,
            department,
        };

        try {
            UserSchemaValidator.create(user);
            const newUser = await this.userUseCases.create(user);

            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    };

    public findById = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            UserSchemaValidator.isUUID(id)
            const user = await this.userUseCases.findById(id);
            if (!user)
                return res.status(404).json({ message: 'User not found' });

            return res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    };

    public findAll = async (req: Request, res: Response) => {
        try {
            const users = await this.userUseCases.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    };

    public update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;

        try {
            UserSchemaValidator.update(data);
            const user = await this.userUseCases.update(id, data);
            if (!user)
                return res.status(404).json({ message: 'User not found' });

            return res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    };
}
