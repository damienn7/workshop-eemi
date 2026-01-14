import Joi from 'joi';

export const createInstitutionAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  national_id: Joi.string().required(),
});
