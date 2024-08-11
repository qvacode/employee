import Joi, { ValidationError } from 'joi';
import { AnswerQuestionDto, CreateQuestionDto, QualifyQuestionDto } from '../../domain/question.entity';

export class QuestionSchemaValidator {
    public static create(question: CreateQuestionDto) {
        const schema = Joi.object<CreateQuestionDto>({
            evaluationId: Joi.string().uuid({ version: 'uuidv4' }).required(),
            question: Joi.string().min(12).max(250).required(),
        });

        const { error } = schema.validate(question, { abortEarly: false, allowUnknown: false });
        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            throw new ValidationError(
                message,
                error.details,
                error._original,
            );
        }
    }

    public static update(data: Partial<CreateQuestionDto>) {
        const schema = Joi.object<CreateQuestionDto>({
            evaluationId: Joi.string().uuid({ version: 'uuidv4' }).optional(),
            question: Joi.string().min(12).max(250).optional(),
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

    public static answer(data: AnswerQuestionDto) {
        const schema = Joi.object<AnswerQuestionDto>({
            id: Joi.string().uuid({ version: 'uuidv4' }).required(),
            answer: Joi.string().min(12).max(250).required(),
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

    public static qualify(data: QualifyQuestionDto) {
        const schema = Joi.object<QualifyQuestionDto>({
            id: Joi.string().uuid({ version: 'uuidv4' }).required(),
            score: Joi.number().min(0).max(100).required(),
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

