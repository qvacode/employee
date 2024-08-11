import { Request, Response } from 'express';
import { UserUseCases } from '../../application/user.use-cases';
import { UserSchemaValidator } from './user.schema-validator';
import { SchemaValidator } from '../../../../common/infrastructure/schema-validator';

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

        UserSchemaValidator.create(user);
        const newUser = await this.userUseCases.create(user);

        res.status(201).json(newUser);
    };

    public findById = async (req: Request, res: Response) => {
        const { id } = req.params;

        SchemaValidator.isUUID(id);
        const user = await this.userUseCases.findById(id);

        return res.status(200).json(user);
    };

    public findAll = async (req: Request, res: Response) => {
        const users = await this.userUseCases.findAll();
        return res.status(200).json({ data: users });
    };

    public update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;

        UserSchemaValidator.update(data);
        const user = await this.userUseCases.update(id, data);

        return res.status(200).json(user);
    };
}
