import Joi from 'joi';

export const createInstitutionSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  postal_code: Joi.string().optional(),
});

export const updateInstitutionSchema = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  postal_code: Joi.string().optional(),
});
