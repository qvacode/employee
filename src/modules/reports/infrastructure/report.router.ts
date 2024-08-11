import { Router } from "express";
import { asyncHandler } from "../../../common/infrastructure/app.middleware";
import { reportController } from "./dependencies-injection";

export const reportRouter = Router()

reportRouter.get('/employee/:id', asyncHandler(reportController.createUserReport))
reportRouter.get('/department/:department', asyncHandler(reportController.createDepartmentReport))