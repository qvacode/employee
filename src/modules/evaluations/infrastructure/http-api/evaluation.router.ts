import { Router } from "express";

import { asyncHandler } from "../../../../common/infrastructure/app.middleware";
import { evaluationController } from "../dependencies-injection";
import { adminAndManager } from "../../../auth/infrastructure/auth.middleware";

export const evaluationRouter = Router()

evaluationRouter.post('/', adminAndManager(), asyncHandler(evaluationController.create))
evaluationRouter.get('/:id', asyncHandler(evaluationController.findById))
evaluationRouter.get('/', adminAndManager(), asyncHandler(evaluationController.findAll))
evaluationRouter.put('/:id', adminAndManager(), asyncHandler(evaluationController.update))
evaluationRouter.post('/:id/submit', asyncHandler(evaluationController.submit))

