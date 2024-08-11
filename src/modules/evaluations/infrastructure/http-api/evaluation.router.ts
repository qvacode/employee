import { Router } from "express";

import { asyncHandler } from "../../../../common/infrastructure/app.middleware";
import { evaluationController } from "../dependencies-injection";

export const evaluationRouter = Router()

evaluationRouter.post('/', asyncHandler(evaluationController.create))
evaluationRouter.get('/:id', asyncHandler(evaluationController.findById))
evaluationRouter.get('/', asyncHandler(evaluationController.findAll))
evaluationRouter.put('/:id', asyncHandler(evaluationController.update))
evaluationRouter.post('/:id/submit', asyncHandler(evaluationController.submit))

