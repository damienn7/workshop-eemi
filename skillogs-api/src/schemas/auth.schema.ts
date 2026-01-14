import Joi from 'joi';
import { ProfileType } from '../enums/ProfileType';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  national_id: Joi.string().required(),
  institution_id: Joi.number().integer().required(),
  role: Joi.string()
    .valid('LEARNER', 'INSTRUCTOR')
    .required(),
  profile_type: Joi.string()
    .valid(...Object.values(ProfileType))
    .required(),
});
