import { NextFunction, Request, RequestHandler, Response } from 'express';
import { DomainExceptions } from '../domain/exceptions';
import { ValidationError } from 'joi';
import rateLimit from 'express-rate-limit';

export function errorHandler(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction,
) {
    if (!error) next();

    if (error instanceof DomainExceptions) {
        const { message, status } = error;
        return response.status(status).json({ message });
    } else if (error instanceof ValidationError) {
        return response.status(400).json({ message: error.message });
    } else {
        return response.status(500).json({ message: (error as Error).message });
    }
}

export const asyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: {
        status: 429,
        error: 'Too many requests, please try again later.'
    },
    handler: (req, res, next, options) => {
        res.status(options.message.status).json({
            message: options.message.error,
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
});
