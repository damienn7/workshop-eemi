import Joi from 'joi';

export const createModuleSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().allow('').optional(),
  order: Joi.number().integer().min(1).required(),
  trainingId: Joi.number().integer().positive().required(),
});

export const updateModuleSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  description: Joi.string().allow('').optional(),
  order: Joi.number().integer().min(1).optional(),
}).min(1);
