import { QuestionUseCases } from "../application/question.use-cases";
import { QuestionController } from "./http-api/question.controller";
import { QuestionInMemoryRepository } from "./repositories/in-memory.repository";

export const questionInMemoryRepository = new QuestionInMemoryRepository()
export const questionUseCases = new QuestionUseCases(questionInMemoryRepository)
export const questionController = new QuestionController(questionUseCases)