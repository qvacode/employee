import { EvaluationUseCases } from "../application/evaluation.use-cases";
import { EvaluationController } from "./http-api/evaluation.controller";
import { EvaluationsInMemoryRepository } from "./repositories/in-memory.repository";

export const evaluationInMemoryRepository = new EvaluationsInMemoryRepository()
export const evaluationUseCases = new EvaluationUseCases(evaluationInMemoryRepository)
export const evaluationController = new EvaluationController(evaluationUseCases)