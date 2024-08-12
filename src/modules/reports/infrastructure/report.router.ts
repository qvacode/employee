import { Router } from "express";
import { asyncHandler } from "../../../common/infrastructure/app.middleware";
import { reportController } from "./dependencies-injection";
import { adminAndManager } from "../../auth/infrastructure/auth.middleware";

export const reportRouter = Router()

reportRouter.get('/employee/:id', adminAndManager(), asyncHandler(reportController.createUserReport))
reportRouter.get('/department/:department', adminAndManager(), asyncHandler(reportController.createDepartmentReport))