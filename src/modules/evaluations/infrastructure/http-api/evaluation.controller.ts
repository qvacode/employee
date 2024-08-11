import { Request, Response } from "express";

import { EvaluationUseCases } from "../../application/evaluation.use-cases";
import { CreateEvaluationDto } from '../../domain/evaluation.entity';
import { EvaluationSchemaValidator } from "./evaluation.schema-validator";
import { userUseCases } from "../../../users/infrastructure/dependencies-injection";

export class EvaluationController {
    constructor(private readonly evaluationUseCases: EvaluationUseCases) {}

    public create = async (req: Request, res: Response) => {
        const { period, type, userId }: CreateEvaluationDto = req.body

        const evaluation = {
            period,
            type,
            userId
        }

        EvaluationSchemaValidator.create(evaluation)
        await userUseCases.findById(userId)
        const newEvaluation = await this.evaluationUseCases.create(evaluation)

        return res.status(201).json(newEvaluation)
    }

    public findById = async (req: Request, res: Response) => {
        const { id } = req.params

        EvaluationSchemaValidator.isUUID(id)
        const evaluation = await this.evaluationUseCases.findById(id)

        return res.status(200).json(evaluation)
    }

    public findAll = async (req: Request, res: Response) => {
        const evaluations = await this.evaluationUseCases.findAll()
        return res.status(200).json({ data: evaluations })
    }

    public update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;

        EvaluationSchemaValidator.isUUID(id)
        EvaluationSchemaValidator.update(data)

        const updatedUser = await this.evaluationUseCases.update(id, data)

        return res.status(200).json(updatedUser)
    }

    public submit = async (req: Request, res: Response) => {
        const { id } = req.params;

        EvaluationSchemaValidator.isUUID(id)
        const evaluation = await this.evaluationUseCases.submit(id)

        return res.status(200).json(evaluation)
    }
}