import { Request, Response } from "express";
import { QuestionUseCases } from "../../application/question.use-cases";
import { AnswerQuestionDto, CreateQuestionDto, QualifyQuestionDto } from "../../domain/question.entity";
import { QuestionSchemaValidator } from "./question.schema-validator";
import { evaluationUseCases } from "../../../evaluations/infrastructure/dependencies-injection";
import { SchemaValidator } from "../../../../common/infrastructure/schema-validator";

export class QuestionController {
    constructor(private readonly questionUseCases: QuestionUseCases) {}

    public create = async (req: Request, res: Response) => {
        const { evaluationId, question: q }: CreateQuestionDto = req.body

        const question = {
            evaluationId, question: q
        }

        QuestionSchemaValidator.create(question)
        await evaluationUseCases.findById(evaluationId)
        const newQuestion = await this.questionUseCases.create(question)

        return res.status(201).json(newQuestion)
    }

    public findById = async (req: Request, res: Response) => {
        const { id } = req.params

        SchemaValidator.isUUID(id)
        const question = await this.questionUseCases.findById(id)

        return res.status(200).json(question)
    } 

    public findAll = async (req: Request, res: Response) => {
        const questions = await this.questionUseCases.findAll()
        return res.status(200).json({ data: questions })
    }

    public answer = async (req: Request, res: Response) => {
        const { id } = req.params
        const { answer } = req.body

        const answerDto: AnswerQuestionDto = {
            answer, id
        }
        QuestionSchemaValidator.answer(answerDto)
        const questionAnswered = await this.questionUseCases.answer(id, answer)

        return res.status(200).json(questionAnswered) 
    }

    public qualify = async (req: Request, res: Response) => {
        const { id } = req.params
        const { score } = req.body

        const qualifyDto: QualifyQuestionDto = {
            score, id
        }
        QuestionSchemaValidator.qualify(qualifyDto)
        const questionQualified = await this.questionUseCases.qualify(id, score)

        return res.status(200).json(questionQualified)
    }
}