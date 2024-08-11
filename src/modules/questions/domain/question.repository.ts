import { Question, QuestionPrimitiveData } from "./question.entity";

export abstract class QuestionRepository {
    abstract create(question: Question): Promise<void>
    abstract findById(id: string): Promise<QuestionPrimitiveData | null>
    abstract findAll(): Promise<QuestionPrimitiveData [] | []>
    abstract answer(id: string, answer: string): Promise<QuestionPrimitiveData | null>
    abstract qualify(id: string, score: number): Promise<QuestionPrimitiveData | null>
    abstract findByEvaluation(evaluationId: string): Promise<QuestionPrimitiveData[]>
}