import { Router } from "express";

import { asyncHandler } from "../../../../common/infrastructure/app.middleware";
import { questionController } from "../dependencies-injection";
import { onlyManager } from "../../../auth/infrastructure/auth.middleware";

export const questionRouter = Router()

questionRouter.post('/', onlyManager(), asyncHandler(questionController.create))
questionRouter.get('/:id', asyncHandler(questionController.findById))
questionRouter.get('/', asyncHandler(questionController.findAll))
questionRouter.patch('/:id/answer', asyncHandler(questionController.answer))
questionRouter.patch('/:id/qualify', onlyManager(), asyncHandler(questionController.qualify))