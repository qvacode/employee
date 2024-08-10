import { Router } from "express";
import { userController } from "../instances";
import { asyncHandler } from "../../../../common/infrastructure/app.middleware";

export const userRouter = Router();

userRouter.post('/', asyncHandler(userController.create));
userRouter.get('/:id', asyncHandler(userController.findById));
userRouter.get('/', asyncHandler(userController.findAll));
userRouter.put('/:id', asyncHandler(userController.update));