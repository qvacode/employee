import http from 'http';
import express, { Express, NextFunction, Request, Response } from 'express';
import { serve, setup } from 'swagger-ui-express';
import { join } from 'path';

import { Env } from '../config/env.config';
import { swaggerSpecs } from '../config/swagger.config';
import { userRouter } from '../modules/users/infrastructure/http-api/user.router';
import { errorHandler, limiter } from './infrastructure/app.middleware';
import { evaluationRouter } from '../modules/evaluations/infrastructure/http-api/evaluation.router';
import { questionRouter } from '../modules/questions/infrastructure/http-api/question.router';
import { reportRouter } from '../modules/reports/infrastructure/report.router';
import { authRouter } from '../modules/auth/infrastructure/auth.router';
import { eventListener } from './infrastructure/events/listener';

export class Server {
    private app: Express;
    private httpServer: http.Server;
    private publicPath: string = join(process.cwd(), 'views');
    public static readonly port: number = Env.PORT;

    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);

        this.middlewares();

        this.routes();
    }

    private middlewares() {
        // Habilitamos CORS
        this.app.use(
            (request: Request, response: Response, next: NextFunction) => {
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader(
                    'Access-Control-Allow-Methods',
                    'GET, POST, PUT, DELETE',
                );
                response.setHeader(
                    'Access-Control-Allow-Headers',
                    'Content-Type, Authorization',
                );
                next();
            },
        );

        this.app.use(limiter)

        this.app.use(express.static(this.publicPath));
        this.app.use(express.urlencoded({ extended: true, limit: '5120mb' }));
        this.app.use(express.json({ limit: '5120mb' }));

        this.app.use(
            (err: any, req: Request, res: Response, next: NextFunction) => {
                if (err instanceof SyntaxError) {
                    return res.status(422).json({ error: 'Not valid input !' });
                }
                next();
            },
        );
    }

    private routes() {
        this.app.use('/api/v1/doc', serve, setup(swaggerSpecs));
        // ToDo: agregamos las rutas de la app aquí
        this.app.use('/api/v1/auth', authRouter);
        this.app.use('/api/v1/employees', userRouter);
        this.app.use('/api/v1/evaluations', evaluationRouter);
        this.app.use('/api/v1/questions', questionRouter);
        this.app.use('/api/v1/reports', reportRouter);

        // !VALIDACIÓN DE ERRORES
        this.app.use(errorHandler)
    }

    async listen(): Promise<void> {
        this.httpServer.listen(Server.port, async () => {
            console.log(`🤖 -->> Server on port: ${Server.port}`);
            console.info(`📑 -->> Server Docs: http://localhost:${Server.port}/api/v1/doc`);

            eventListener()
        });
    }

    async close(): Promise<void> {
        console.log(
            '👋 -->> Server closed',
            `${Server.name}-${this.close.name}`,
        );
        this.httpServer.close(() => {
            process.exit();
        });
    }
}
