import { Router } from "express";
import { asyncHandler } from "../../../common/infrastructure/app.middleware";
import { authController } from "./dependencies-injection";

export const authRouter = Router()

authRouter.post('/login', asyncHandler(authController.login))
authRouter.post('/register', asyncHandler(authController.register))