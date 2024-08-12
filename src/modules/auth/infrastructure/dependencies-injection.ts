import { userInMemoryRepository, userMongoRepository } from "../../users/infrastructure/dependencies-injection";
import { AuthUseCases } from "../application/auth.use-cases";
import { AuthController } from "./auth.controller";

export const authUseCases = new AuthUseCases(userMongoRepository)
export const authController = new AuthController(authUseCases)