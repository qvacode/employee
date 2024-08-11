import { CreateEvaluationDto, Evaluation, EvaluationPrimitiveData } from "./evaluation.entity";

export abstract class EvaluationRepository {
    abstract create(evaluation: Evaluation): Promise<void>
    abstract findById(id: string): Promise<EvaluationPrimitiveData | null>
    abstract findAll(): Promise<EvaluationPrimitiveData[] | []>
    abstract update(id: string, data: Partial<CreateEvaluationDto>): Promise<EvaluationPrimitiveData | null>
    abstract submit(id: string): Promise<EvaluationPrimitiveData | null>
    abstract assignEvaluator(id: string): Promise<EvaluationPrimitiveData | null>
}