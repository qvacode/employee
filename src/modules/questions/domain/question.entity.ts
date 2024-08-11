import { Utility } from "../../../common/utility"

export interface QuestionPrimitiveData {
    id: string
    question: string
    answer: string | null
    score: number | null
    evaluationId: string
}

export interface CreateQuestionDto extends Omit<QuestionPrimitiveData, 'id' | 'answer' | 'score'> {}
export interface AnswerQuestionDto extends Pick<QuestionPrimitiveData, 'id' | 'answer'> {}
export interface QualifyQuestionDto extends Pick<QuestionPrimitiveData, 'id' | 'score'> {}


export class Question {
    constructor(private readonly question: QuestionPrimitiveData) {}

    public static create(question: CreateQuestionDto): Question {
        return new Question({
            id: Utility.generateId(),
            answer: null,
            evaluationId: question.evaluationId,
            question: question.question,
            score: null
        })
    }

    public toValue(): QuestionPrimitiveData {
        return {
            answer: this.question.answer,
            evaluationId: this.question.evaluationId,
            id: this.question.id,
            question: this.question.question,
            score: this.question.score
        }
    }
}