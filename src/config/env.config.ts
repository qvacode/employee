import 'dotenv/config';
import Joi from 'joi';

interface EnvironmentVars {
  PORT: number
  JWT_SECRET: string
  JWT_EXPIRATION: string
  MONGO_URL: string
}

const environmentSchema = Joi.object<EnvironmentVars>({
    PORT: Joi.number().required(),
    JWT_SECRET: Joi.string().required(),
	JWT_EXPIRATION: Joi.string().required(),
	MONGO_URL: Joi.string().required(),
  })
  .unknown(true);

const { error, value } = environmentSchema.validate(process.env)

if(error) throw new Error(`Config validation errors: ${error.message}`)

const environment: EnvironmentVars = value

export const Env = {
	PORT: environment.PORT,
	JWT_SECRET: environment.JWT_SECRET,
	JWT_EXPIRATION: environment.JWT_EXPIRATION,
	MONGO_URL: environment.MONGO_URL
}
