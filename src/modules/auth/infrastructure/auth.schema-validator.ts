import Joi, { ValidationError } from 'joi';
import { LoginUserDto, RegisterUserDto } from '../domain/auth.entity';

export class AuthSchemaValidator {
    public static login(data: LoginUserDto) {
        const schema = Joi.object<LoginUserDto>({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
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

    public static register(user: RegisterUserDto) {
        const schema = Joi.object<RegisterUserDto>({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
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
}

