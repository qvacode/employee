import { UserUseCases } from "../application/user.use-cases";
import { UserController } from "./http-api/user.controller";
import { UserInMemoryRepository } from "./repositories/in-memory-user.repository";

const userInMemoryRepository = new UserInMemoryRepository();
const userUseCases = new UserUseCases(userInMemoryRepository);
export const userController = new UserController(userUseCases); 