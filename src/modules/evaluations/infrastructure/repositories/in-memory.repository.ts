import { DomainExceptions } from '../../../../common/domain/exceptions';
import { UserRole } from '../../../users/domain/user.entity';
import { userInMemoryRepository } from '../../../users/infrastructure/dependencies-injection';
import {
    CreateEvaluationDto,
    Evaluation,
    EvaluationPrimitiveData,
    EvaluationStatus,
} from '../../domain/evaluation.entity';
import { EvaluationRepository } from '../../domain/evaluation.repository';

export class EvaluationsInMemoryRepository implements EvaluationRepository {
    private evaluations: EvaluationPrimitiveData[] = [];

    async create(evaluation: Evaluation): Promise<void> {
        this.evaluations.push(evaluation.toValue());
    }

    async findAll(): Promise<EvaluationPrimitiveData[] | []> {
        return this.evaluations;
    }

    async findById(id: string): Promise<EvaluationPrimitiveData | null> {
        const evaluation = this.evaluations.find(
            (evaluation) => evaluation.id === id,
        );
        if (!evaluation) return null;

        return evaluation;
    }

    async update(id: string, data: Partial<CreateEvaluationDto>): Promise<EvaluationPrimitiveData | null> {
        const evaluationIndex = this.evaluations.findIndex(
            (evaluation) => evaluation.id === id,
        );

        if (evaluationIndex === -1) return null;

        this.evaluations[evaluationIndex] = {
            ...this.evaluations[evaluationIndex],
            ...data,
        };

        return this.evaluations[evaluationIndex];
    }

    async submit(id: string): Promise<EvaluationPrimitiveData | null> {
        return await this.assignEvaluator(id)
    }

    async assignEvaluator(id: string): Promise<EvaluationPrimitiveData | null> {
        const evaluation = await this.findById(id);
        if (!evaluation) return null;
        if (evaluation.evaluator)
            throw new DomainExceptions('Evaluation is assigned!', 409);

        const managers = (await userInMemoryRepository.findAll()).filter(
            (user) => user.role === UserRole.MANAGER,
        );
        if (!managers)
            throw new DomainExceptions('Not managers available!', 404);

        const evaluationsAssigned = this.evaluations.filter((evaluation) => {
            if (evaluation.evaluator) return evaluation;
        });
        
        let leastAssignedManager = managers[0];
        let leastAssignedCount = evaluationsAssigned.filter((el) => el.evaluator === leastAssignedManager.id).length;

        for (const manager of managers) {
            const assignedCount = evaluationsAssigned.filter((el) => el.evaluator === manager.id).length;
            if (assignedCount < leastAssignedCount) {
                leastAssignedManager = manager;
                leastAssignedCount = assignedCount;
            }
        }
        
        evaluation.status = EvaluationStatus.INPROGRESS
        evaluation.evaluator = leastAssignedManager.id;
        await this.update(id, evaluation);

        return evaluation;
    }
}
