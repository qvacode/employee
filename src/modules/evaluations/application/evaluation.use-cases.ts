import { EvaluationRepository } from "../domain/evaluation.repository";
import { CreateEvaluationDto, Evaluation, EvaluationPrimitiveData } from "../domain/evaluation.entity";
import { DomainExceptions } from "../../../common/domain/exceptions";
import { userUseCases } from "../../users/infrastructure/dependencies-injection";

export class EvaluationUseCases {
    constructor(private readonly repository: EvaluationRepository) {}
    
    public async create(data: CreateEvaluationDto): Promise<EvaluationPrimitiveData> {
        const evaluation = Evaluation.create(data);
        await this.repository.create(evaluation);

        return evaluation.toValue()
    }
    
    public async findById(id: string): Promise<EvaluationPrimitiveData> {
        const evaluation = await this.repository.findById(id);
        if(!evaluation) throw new DomainExceptions(`Evaluation with id = ${id} not found`, 404);

        return evaluation
    }
    
    public async findAll(): Promise<EvaluationPrimitiveData[]> {
        return await this.repository.findAll();
    }
    
    public async update(id: string, data: Partial<CreateEvaluationDto>): Promise<EvaluationPrimitiveData> {
        await this.findById(id);

        const updatedEvaluation = await this.repository.update(id, data);
        if(!updatedEvaluation) throw new DomainExceptions('Updated evaluation not processed!', 409)

        return updatedEvaluation
    }
    
    public async submit(id: string): Promise<EvaluationPrimitiveData> {
        await this.findById(id);
        
        const submittedEvaluation = await this.repository.submit(id);
        if (!submittedEvaluation) throw new DomainExceptions('Submit evaluation not processed!', 409);

        return submittedEvaluation
    }
    
    public async assignEvaluator(id: string): Promise<EvaluationPrimitiveData> {
        await this.findById(id);
        
        const evaluatorAssigned =  await this.repository.assignEvaluator(id);
        if(!evaluatorAssigned) throw new DomainExceptions('Assign evaluator not processed!', 409)

        return evaluatorAssigned
    }
}
