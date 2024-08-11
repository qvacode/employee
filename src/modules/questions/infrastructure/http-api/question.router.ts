import { Router } from "express";
import { asyncHandler } from "../../../../common/infrastructure/app.middleware";
import { questionController } from "../dependencies-injection";
import { authorizeRoles } from "../../../auth/infrastructure/auth.middleware";
import { UserRole } from "../../../users/domain/user.entity";

export const questionRouter = Router()

questionRouter.post('/', asyncHandler(questionController.create))
questionRouter.get('/:id', asyncHandler(questionController.findById))
questionRouter.get('/', asyncHandler(questionController.findAll))
questionRouter.patch('/:id/answer', asyncHandler(questionController.answer))
questionRouter.patch('/:id/qualify', authorizeRoles([UserRole.MANAGER]) ,asyncHandler(questionController.qualify))