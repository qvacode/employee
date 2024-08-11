import Joi, { ValidationError } from 'joi';

export class SchemaValidator {
    public static isUUID(data: string) {
        const schema = Joi.string().uuid({ version: 'uuidv4' });

        const { error } = schema.validate(data, {
            abortEarly: false,
            allowUnknown: false,
        });
        if (error) {
            const message = error.details
                .map((detail) => detail.message)
                .join(', ');
            throw new ValidationError(message, error.details, error._original);
        }
    }
}
