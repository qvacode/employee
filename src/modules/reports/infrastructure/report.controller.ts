import { Request, Response } from "express";
import { ReportUseCases } from "../application/report.use-cases";
import { SchemaValidator } from "../../../common/infrastructure/schema-validator";

export class ReportController {
    constructor(private readonly reportUseCases: ReportUseCases) {}

    public createDepartmentReport = async (req: Request, res: Response) => {
        const { department } = req.params

        SchemaValidator.isUUID(department)
        const report = await this.reportUseCases.createDepartmentReport(department)
        return res.status(200).json(report)
    }
    
    public createUserReport = async (req: Request, res: Response) => {
        const { id } = req.params
        
        SchemaValidator.isUUID(id)
        const report = await this.reportUseCases.createUserReport(id)
        return res.status(200).json(report)
    }
}