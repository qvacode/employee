import Joi, { ValidationError } from 'joi';
import { CreateUserDto, UserRole, UserStatus } from '../../domain/user.entity';

export class UserSchemaValidator {
    public static create(user: CreateUserDto) {
        const schema = Joi.object<CreateUserDto>({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            role: Joi.string().valid(...Object.values(UserRole)).required(),
            password: Joi.string().min(6).required(),
            status: Joi.string().valid(...Object.values(UserStatus)).required(),
            position: Joi.string().min(2).max(50).required(),
            department: Joi.string().min(2).max(50).required(),
        });

        const { error } = schema.validate(user, { abortEarly: false, allowUnknown: false });
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

    public static update(data: Partial<CreateUserDto>) {
        const schema = Joi.object<CreateUserDto>({
            name: Joi.string().min(3).max(30).optional(),
            email: Joi.string().email().optional(),
            role: Joi.string().valid(...Object.values(UserRole)).optional(),
            password: Joi.string().min(6).optional(),
            status: Joi.string().valid(...Object.values(UserStatus)).optional(),
            position: Joi.string().min(2).max(50).optional(),
            department: Joi.string().min(2).max(50).optional(),
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

