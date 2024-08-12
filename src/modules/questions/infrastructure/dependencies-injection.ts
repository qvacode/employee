import { QuestionUseCases } from "../application/question.use-cases";
import { QuestionController } from "./http-api/question.controller";
import { QuestionInMemoryRepository } from "./repositories/in-memory.repository";
import { MongoQuestionRepository } from "./repositories/mongodb/mongodb.repository";

export const questionInMemoryRepository = new QuestionInMemoryRepository()

export const questionMongoRepository = new MongoQuestionRepository()
export const questionUseCases = new QuestionUseCases(questionMongoRepository)
export const questionController = new QuestionController(questionUseCases)