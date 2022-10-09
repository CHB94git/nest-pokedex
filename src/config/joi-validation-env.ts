import * as Joi from 'joi';

export const JoiValidationEnvSchema = Joi.object({
  MONGO_DB: Joi.required(),
  PORT: Joi.number().default(3003),
  DEFAULT_LIMIT: Joi.number().default(8),
})