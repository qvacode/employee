import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Employee 360',
            version: '1.0.5',
            description:
                'API RESTful para un sistema de evaluación 360 grados de empleados remotos en una empresa de desarrollo de aplicaciones.',
        },
    },
    apis: [`${process.cwd()}/docs/api/*.yml`],
};

export const swaggerSpecs = swaggerJSDoc(options);
