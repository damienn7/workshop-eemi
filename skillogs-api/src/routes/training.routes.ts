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
const controller = new TrainingController();

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
  controller.create
);

/**
 * LIST TRAININGS (institution scoped)
 * GET /trainings
 */
router.get('/', controller.findAll);

/**
 * GET ONE TRAINING
 * GET /trainings/:id
 */
router.get('/:id', controller.findOne);

/**
 * UPDATE TRAINING
 * PUT /trainings/:id
 * Roles: ADMIN, INSTRUCTOR
 */
router.put(
  '/:id',
  requireRole([Role.ADMIN, Role.INSTRUCTOR]),
  validateBody(updateTrainingSchema),
  controller.update
);

/**
 * DELETE TRAINING
 * DELETE /trainings/:id
 * Roles: ADMIN, INSTRUCTOR
 */
router.delete(
  '/:id',
  requireRole([Role.ADMIN, Role.INSTRUCTOR]),
  controller.remove
);

export default router;
