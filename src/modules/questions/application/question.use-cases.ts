import { DomainExceptions } from "../../../common/domain/exceptions";
import { eventEmitter, Events } from "../../../common/infrastructure/events/emitter";
import { CreateQuestionDto, Question, QuestionPrimitiveData } from "../domain/question.entity";
import { QuestionRepository } from "../domain/question.repository";

export class QuestionUseCases {
    constructor(private readonly questionRepository: QuestionRepository) {}

    public create = async (question: CreateQuestionDto): Promise<QuestionPrimitiveData> => {
        const newQuestion = Question.create(question)
        await this.questionRepository.create(newQuestion)

        return newQuestion.toValue()
    }

    public findById = async (id: string): Promise<QuestionPrimitiveData> => {
        const question = await this.questionRepository.findById(id)
        if(!question) throw new DomainExceptions(`Question with id = ${id} not found!`, 404)

        return question
    }

    public findAll = async (): Promise<QuestionPrimitiveData[]> => {
        return await this.questionRepository.findAll()
    }

    public answer = async (id: string, answer: string): Promise<QuestionPrimitiveData> => {
        const question = await this.questionRepository.answer(id, answer)
        if(!question) throw new DomainExceptions(`Question with id = ${id} not found!`, 404)

        return question
    }

    public qualify = async (id: string, score: number): Promise<QuestionPrimitiveData> => {
        const question = await this.questionRepository.qualify(id, score)
        if(!question) throw new DomainExceptions(`Question with id = ${id} not found!`, 404)

        eventEmitter.emit(Events.QUALIFIED, question.id)
        return question
    }

    public findByEvaluation = async (evaluationId: string): Promise<QuestionPrimitiveData[]> => {
        return await this.questionRepository.findByEvaluation(evaluationId)
    }
}