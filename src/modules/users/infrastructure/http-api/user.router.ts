import { Router } from "express";
import { userController } from "../dependencies-injection";
import { asyncHandler } from "../../../../common/infrastructure/app.middleware";
import { adminAndManager, onlyAdmin } from "../../../auth/infrastructure/auth.middleware";

export const userRouter = Router();

userRouter.post('/', onlyAdmin(), asyncHandler(userController.create));
userRouter.get('/:id', asyncHandler(userController.findById));
userRouter.get('/', adminAndManager(), asyncHandler(userController.findAll));
userRouter.put('/:id', onlyAdmin(), asyncHandler(userController.update));