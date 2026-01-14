import Joi from 'joi';
import 'dotenv/config';

const envSchema = Joi.object({
  PORT: Joi.number().port().default(3000),

  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string()
    .pattern(/^\d+(s|m|h|d)$/)
    .required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().default(3306),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow('').required(),
  DB_NAME: Joi.string().required(),
}).unknown(); // autorise les autres vars d'env

const { value, error } = envSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(
    `Invalid environment configuration:\n${error.details
      .map((d) => `- ${d.message} ${process.env[d.context?.key ?? ''] ? `(got "${process.env[d.context?.key ?? '']}")` : '(not set)'}`)
      .join('\n')}`
  );
}

export const env = value as {
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
};
