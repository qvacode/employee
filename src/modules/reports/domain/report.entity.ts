import { EvaluationPrimitiveData } from "../../evaluations/domain/evaluation.entity";
import { UserPrimitiveData } from "../../users/domain/user.entity";

export interface UserEvaluationReport extends UserPrimitiveData {
    evaluations: EvaluationPrimitiveData[]
}

export interface DepartmentEvaluationReport {
    id: string
    users: UserEvaluationReport[]
}

export abstract class Report {
    abstract createUserReport(id: string): Promise<UserEvaluationReport>
    abstract createDepartmentReport(department: string): Promise<DepartmentEvaluationReport>
}