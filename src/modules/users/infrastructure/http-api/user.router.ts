import { Router } from "express";
import { userController } from "../instances";

export const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/:id', userController.findById);
userRouter.get('/', userController.findAll);
userRouter.put('/:id', userController.update);