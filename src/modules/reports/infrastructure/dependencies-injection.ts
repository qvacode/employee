import { evaluationUseCases } from "../../evaluations/infrastructure/dependencies-injection";
import { userUseCases } from "../../users/infrastructure/dependencies-injection";
import { ReportUseCases } from "../application/report.use-cases";
import { ReportController } from "./report.controller";

export const reportUseCases = new ReportUseCases(userUseCases, evaluationUseCases)
export const reportController = new ReportController(reportUseCases)