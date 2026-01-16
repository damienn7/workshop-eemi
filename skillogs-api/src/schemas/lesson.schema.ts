import Joi from 'joi';
import { LessonType } from '../enums/LessonType';

export const createLessonSchema = Joi.object({
  title: Joi.string().min(3).required(),
  type: Joi.string()
    .valid(...Object.values(LessonType))
    .required(),
  order: Joi.number().integer().min(0).required(),
  moduleId: Joi.number().integer().required(),
  description: Joi.string().allow('', null),
  content: Joi.string().allow('', null),
  estimated_duration: Joi.number().integer().min(1).optional(),
});

export const updateLessonSchema = Joi.object({
  title: Joi.string().min(3),
  order: Joi.number().integer().min(0),
  description: Joi.string().allow('', null),
  content: Joi.string().allow('', null),
  estimated_duration: Joi.number().integer().min(1),
  is_published: Joi.boolean(),
});