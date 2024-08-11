import { Utility } from "../../../common/utility"

export enum EvaluationStatus {
    PENDING = 'pending',
    INPROGRESS = 'inprogress',
    COMPLETED = 'completed',
}

export interface EvaluationPrimitiveData {
    id: string
    period: string
    status: EvaluationStatus
    type: string
    score: number | null
    userId: string
    evaluator: string | null
}

export interface CreateEvaluationDto extends Omit<EvaluationPrimitiveData, 'id' | 'status' | 'score' | 'evaluator'> {}

export class Evaluation {
    constructor(private readonly evaluation: EvaluationPrimitiveData) {}

    public static create(evaluation: CreateEvaluationDto) {
        return new Evaluation({
            id: Utility.generateId(),
            period: evaluation.period,
            score: null,
            status: EvaluationStatus.PENDING,
            type: evaluation.type,
            userId: evaluation.userId,
            evaluator: null
        })
    }

    public toValue(): EvaluationPrimitiveData {
        return {
            id: this.evaluation.id,
            period: this.evaluation.period,
            score: this.evaluation.score,
            status: this.evaluation.status,
            type: this.evaluation.type,
            userId: this.evaluation.userId,
            evaluator: this.evaluation.evaluator
        }
    }
}