import { EvaluationUseCases } from "../../evaluations/application/evaluation.use-cases";
import { UserUseCases } from "../../users/application/user.use-cases";
import { Report, UserEvaluationReport, DepartmentEvaluationReport } from '../domain/report.entity';

export class ReportUseCases implements Report {
    constructor(
        private readonly userUseCases: UserUseCases,
        private readonly evaluationUseCases: EvaluationUseCases) {}

    async createDepartmentReport(department: string): Promise<DepartmentEvaluationReport> {
        const usersInDepartment = (await this.userUseCases.findAll()).filter(user => user.department === department)
        if(!usersInDepartment.length) return { id: department, users: [] }

        const users: UserEvaluationReport[] = []
        for (const user of usersInDepartment) {
            const report = await this.createUserReport(user.id)
            users.push(report)
        }

        return {
            id: department,
            users
        }
    }

    async createUserReport(id: string): Promise<UserEvaluationReport> {
        const user = await this.userUseCases.findById(id)
        const evaluations = (await this.evaluationUseCases.findAll()).filter(evaluation => evaluation.userId === id)

        return {
            ...user,
            evaluations
        }
    }
}