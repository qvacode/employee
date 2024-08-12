import { EvaluationRepository } from '../../../domain/evaluation.repository';
import { CreateEvaluationDto, Evaluation, EvaluationPrimitiveData, EvaluationStatus } from '../../../domain/evaluation.entity';
import { EvaluationModel } from './evaluation.schema';
import { DomainExceptions } from '../../../../../common/domain/exceptions';
import { UserRole } from '../../../../users/domain/user.entity';
import { UserModel } from '../../../../users/infrastructure/repositories/mongodb/user.schema';

export class MongoEvaluationRepository implements EvaluationRepository {
    async create(evaluation: Evaluation): Promise<void> {
        const evaluationData = new EvaluationModel(evaluation.toValue());
        await evaluationData.save();
    }

    async findById(id: string): Promise<EvaluationPrimitiveData | null> {
        const evaluation = await EvaluationModel.findOne({ id }).exec();
        return evaluation ? evaluation.toObject() : null;
    }

    async findAll(): Promise<EvaluationPrimitiveData[] | []> {
        const evaluations = await EvaluationModel.find().exec();
        return evaluations.map(evaluation => evaluation.toObject());
    }

    async update(id: string, data: Partial<CreateEvaluationDto>): Promise<EvaluationPrimitiveData | null> {
        const evaluation = await EvaluationModel.findOneAndUpdate(
            { id },
            { $set: data },
            { new: true }
        ).exec();

        return evaluation ? evaluation.toObject() : null;
    }

    async submit(id: string): Promise<EvaluationPrimitiveData | null> {
        return await this.assignEvaluator(id)
    }

    async assignEvaluator(id: string): Promise<EvaluationPrimitiveData | null> {
        const evaluation = await this.findById(id);
        if (!evaluation) return null;
        if (evaluation.evaluator) {
            throw new DomainExceptions('Evaluation is assigned!', 409);
        }
        
        const managers = await UserModel.find({ role: UserRole.MANAGER }).exec();
        if (!managers || managers.length === 0) {
            throw new DomainExceptions('No managers available!', 404);
        }
        
        const evaluationsAssigned = await EvaluationModel.find({ evaluator: { $ne: null } }).exec();

        let leastAssignedManager = managers[0];
        let leastAssignedCount = evaluationsAssigned.filter((el) => el.evaluator === leastAssignedManager.id).length;

        for (const manager of managers) {
            const assignedCount = evaluationsAssigned.filter((el) => el.evaluator === manager.id).length;
            if (assignedCount < leastAssignedCount) {
                leastAssignedManager = manager;
                leastAssignedCount = assignedCount;
            }
        }
        
        evaluation.status = EvaluationStatus.INPROGRESS;
        evaluation.evaluator = leastAssignedManager.id;
        await EvaluationModel.updateOne({ id }, { status: EvaluationStatus.INPROGRESS, evaluator: leastAssignedManager.id }).exec();

        return evaluation;
    }
}
