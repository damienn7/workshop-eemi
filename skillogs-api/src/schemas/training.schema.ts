import Joi from 'joi';
import { TrainingStatus } from '../enums/TrainingStatus';

export const createTrainingSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  level: Joi.string().max(100).optional(),
  status: Joi.string()
    .valid(TrainingStatus.DRAFT, TrainingStatus.PUBLISHED)
    .optional(),
});

export const updateTrainingSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  description: Joi.string().min(10).optional(),
  level: Joi.string().max(100).optional(),
  status: Joi.string()
    .valid(TrainingStatus.DRAFT, TrainingStatus.PUBLISHED)
    .optional(),
}).min(1); // au moins un champ à modifier
