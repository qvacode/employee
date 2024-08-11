import 'dotenv/config';
import Joi from 'joi';

interface EnvironmentVars {
  PORT: number
  JWT_SECRET: string
  JWT_EXPIRATION: string
  MONGO_URL: string
  MAIL_SERVER_HOST: string
  MAIL_SERVER_PORT: number
  MAIL_USER: string
  MAIL_PASSWORD: string
}

const environmentSchema = Joi.object<EnvironmentVars>({
    PORT: Joi.number().required(),
    JWT_SECRET: Joi.string().required(),
	  JWT_EXPIRATION: Joi.string().required(),
	  MONGO_URL: Joi.string().required(),
    MAIL_PASSWORD: Joi.string().required(),
    MAIL_SERVER_HOST: Joi.string().required(),
    MAIL_SERVER_PORT: Joi.number().required(),
    MAIL_USER: Joi.string().required(),
  }).unknown(true);

const { error, value } = environmentSchema.validate(process.env)

if(error) throw new Error(`Config validation errors: ${error.message}`)

const environment: EnvironmentVars = value

export const Env = {
	PORT: environment.PORT,
	JWT_SECRET: environment.JWT_SECRET,
	JWT_EXPIRATION: environment.JWT_EXPIRATION,
	MONGO_URL: environment.MONGO_URL,
  MAIL_SERVER_HOST: environment.MAIL_SERVER_HOST,
  MAIL_SERVER_PORT: environment.MAIL_SERVER_PORT,
  MAIL_USER: environment.MAIL_USER,
  MAIL_PASSWORD: environment.MAIL_PASSWORD
}
