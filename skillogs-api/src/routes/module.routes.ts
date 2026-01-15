import { Router } from 'express';
import { ModuleController } from '../controllers/module.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { validateBody } from '../middlewares/validateBody.middleware';
import { Role } from '../enums/Role';
import {
  createModuleSchema,
  updateModuleSchema,
} from '../schemas/module.schema';

const router = Router();

router.use(authMiddleware);

/**
 * CREATE MODULE
 */
router.post(
  '/',
  requireRole([Role.ADMIN, Role.INSTRUCTOR]),
  validateBody(createModuleSchema),
  ModuleController.create
);

/**
 * LIST MODULES BY TRAINING
 */
router.get(
  '/training/:trainingId',
  ModuleController.findAll
);

/**
 * GET ONE MODULE
 */
router.get('/:id', ModuleController.findOne);

/**
 * UPDATE MODULE
 */
router.put(
  '/:id',
  requireRole([Role.ADMIN, Role.INSTRUCTOR]),
  validateBody(updateModuleSchema),
  ModuleController.update
);

/**
 * DELETE MODULE
 */
router.delete(
  '/:id',
  requireRole([Role.ADMIN, Role.INSTRUCTOR]),
  ModuleController.delete
);

export default router;
