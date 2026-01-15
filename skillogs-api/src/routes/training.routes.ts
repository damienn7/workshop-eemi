import { Router } from 'express';
import { TrainingController } from '../controllers/training.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { validateBody } from '../middlewares/validateBody.middleware';
import { Role } from '../enums/Role';
import {
  createTrainingSchema,
  updateTrainingSchema,
} from '../schemas/training.schema';

const router = Router();

/**
 * Toutes les routes Training sont protégées
 * + scoppées par institution
 */
router.use(authMiddleware);

/**
 * CREATE TRAINING
 * POST /trainings
 * Roles: ADMIN, INSTRUCTOR
 */
router.post(
  '/',
  requireRole([Role.ADMIN, Role.INSTRUCTOR]),
  validateBody(createTrainingSchema),
  TrainingController.create
);

/**
 * LIST TRAININGS (institution scoped)
 * GET /trainings
 */
router.get('/', TrainingController.findAll);

/**
 * GET ONE TRAINING
 * GET /trainings/:id
 */
router.get('/:id', TrainingController.findOne);

/**
 * UPDATE TRAINING
 * PUT /trainings/:id
 * Roles: ADMIN, INSTRUCTOR
 */
router.put(
  '/:id',
  requireRole([Role.ADMIN, Role.INSTRUCTOR]),
  validateBody(updateTrainingSchema),
  TrainingController.update
);

/**
 * DELETE TRAINING
 * DELETE /trainings/:id
 * Roles: ADMIN, INSTRUCTOR
 */
router.delete(
  '/:id',
  requireRole([Role.ADMIN, Role.INSTRUCTOR]),
  TrainingController.delete
);

export default router;
