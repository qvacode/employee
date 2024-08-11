import Joi, { ValidationError } from 'joi';
import { CreateEvaluationDto } from '../../domain/evaluation.entity';

export class EvaluationSchemaValidator {
    public static create(evaluation: CreateEvaluationDto) {
        const schema = Joi.object<CreateEvaluationDto>({
            period: Joi.string().min(3).max(30).required(),
            type: Joi.string().min(3).max(30).required(),
            userId: Joi.string().uuid({ version: 'uuidv4' }).required(),
        });

        const { error } = schema.validate(evaluation, { abortEarly: false, allowUnknown: false });
        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            throw new ValidationError(
                message,
                error.details,
                error._original,
            );
        }
    }

    public static isUUID(data: string) {
        const schema = Joi.string().uuid({ version: 'uuidv4' })

        const { error } = schema.validate(data, { abortEarly: false, allowUnknown: false });
        if(error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            throw new ValidationError(
                message,
                error.details,
                error._original,
            );
        }
    }

    public static update(data: Partial<CreateEvaluationDto>) {
        const schema = Joi.object<CreateEvaluationDto>({
            period: Joi.string().min(3).max(30).optional(),
            type: Joi.string().min(3).max(30).optional(),
            userId: Joi.string().uuid({ version: 'uuidv4' }).optional(),
        });

        const { error } = schema.validate(data, { abortEarly: false, allowUnknown: false });
        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            throw new ValidationError(
                message,
                error.details,
                error._original,
            );
        }
    }
}

