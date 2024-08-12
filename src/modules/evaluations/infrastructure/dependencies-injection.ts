import { EvaluationUseCases } from "../application/evaluation.use-cases";
import { EvaluationController } from "./http-api/evaluation.controller";
import { EvaluationsInMemoryRepository } from "./repositories/in-memory.repository";
import { MongoEvaluationRepository } from "./repositories/mongodb/mongodb.repository";

export const evaluationInMemoryRepository = new EvaluationsInMemoryRepository()

export const evaluationMongoRepository = new MongoEvaluationRepository()
export const evaluationUseCases = new EvaluationUseCases(evaluationMongoRepository)
export const evaluationController = new EvaluationController(evaluationUseCases)