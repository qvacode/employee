import { Request, Response } from "express";
import { AuthUseCases } from "../application/auth.use-cases";
import { LoginUserDto, RegisterUserDto } from "../domain/auth.entity";
import { AuthSchemaValidator } from "./auth.schema-validator";
import { CreateUserDto } from "../../users/domain/user.entity";

export class AuthController {
    constructor(private readonly authUseCases: AuthUseCases) {}

    public login = async (req: Request, res: Response) => {
        const { email, password }: LoginUserDto = req.body

        const data = {
            email, password
        }

        AuthSchemaValidator.login(data)
        const userLogged = await this.authUseCases.login(data)

        return res.status(200).json(userLogged)
    }

    public register = async (req: Request, res: Response) => {
        const { department, email, name, password, position }: RegisterUserDto = req.body

        const user = {
            department, email, name, password, position
        }
        AuthSchemaValidator.register(user)
        const userRegistered = await this.authUseCases.register(user)

        return res.status(201).json(userRegistered)
    }
}