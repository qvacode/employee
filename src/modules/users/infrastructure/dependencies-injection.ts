import { UserUseCases } from "../application/user.use-cases";
import { UserController } from "./http-api/user.controller";
import { UserInMemoryRepository } from "./repositories/in-memory.repository";
import { MongoUserRepository } from "./repositories/mongodb/mongodb.repository";

export const userInMemoryRepository = new UserInMemoryRepository();

export const userMongoRepository = new MongoUserRepository()
export const userUseCases = new UserUseCases(userMongoRepository);
export const userController = new UserController(userUseCases); 