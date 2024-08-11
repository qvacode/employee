import { DomainExceptions } from "../../../../common/domain/exceptions";
import { Question, QuestionPrimitiveData } from "../../domain/question.entity";
import { QuestionRepository } from "../../domain/question.repository";

export class QuestionInMemoryRepository implements QuestionRepository {
    private questions: QuestionPrimitiveData[] = []

    async create(question: Question): Promise<void> {
        this.questions.push(question.toValue())        
    }

    async findAll(): Promise<QuestionPrimitiveData[] | []> {
        return this.questions
    }

    async findById(id: string): Promise<QuestionPrimitiveData | null> {
        const question = this.questions.find(question => question.id === id)
        if(!question) return null

        return question
    }

    async findByEvaluation(evaluationId: string): Promise<QuestionPrimitiveData[]> {
        return this.questions.filter(question => question.evaluationId === evaluationId)
    }

    private async update(id: string, data: Partial<QuestionPrimitiveData>): Promise<QuestionPrimitiveData | null> {
        const questionIndex = this.questions.findIndex((question) => question.id === id);

        if (questionIndex === -1) return null;

        this.questions[questionIndex] = {
            ...this.questions[questionIndex],
            ...data,
        };

        return this.questions[questionIndex];  
    }

    async answer(id: string, answer: string): Promise<QuestionPrimitiveData | null> {
        const question = await this.findById(id)
        if(!question) return null

        question.answer = answer
        const updatedQuestion = await this.update(id, question)
        if(!updatedQuestion) throw new DomainExceptions('Answer to the question could not be processed', 422)

        return updatedQuestion
    }

    async qualify(id: string, score: number): Promise<QuestionPrimitiveData | null> {
        const question = await this.findById(id)
        if(!question) return null

        question.score = score
        const updatedQuestion = await this.update(id, question)
        if(!updatedQuestion) throw new DomainExceptions('Rating to the question could not be processed', 422)

        return updatedQuestion
    }
}