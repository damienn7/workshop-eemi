import { Router } from 'express';
import { InstitutionController } from '../controllers/institution.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { Role } from '../enums/Role';
import {
  createInstitutionSchema,
  updateInstitutionSchema,
} from '../schemas/institution.schema';
import { InstitutionAdminController } from '../controllers/institution-admin.controller';
import { createInstitutionAdminSchema } from '../schemas/create-institution-admin.schema';
import { validateBody } from '../middlewares/validateBody.middleware';

const router = Router();

/**
 * SUPER_ADMIN only
 */
router.post(
  '/',
  authMiddleware,
  requireRole(Role.SUPER_ADMIN),
  validateBody(createInstitutionSchema),
  InstitutionController.create
);

router.post(
  '/:id/admin',
  authMiddleware,
  requireRole(Role.SUPER_ADMIN),
  validateBody(createInstitutionAdminSchema),
  InstitutionAdminController.create
);


router.get(
  '/',
  authMiddleware,
  requireRole(Role.SUPER_ADMIN),
  InstitutionController.findAll
);

router.get(
  '/:id',
  authMiddleware,
  requireRole(Role.SUPER_ADMIN),
  InstitutionController.findOne
);

router.patch(
  '/:id',
  authMiddleware,
  requireRole(Role.SUPER_ADMIN),
  validateBody(updateInstitutionSchema),
  InstitutionController.update
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole(Role.SUPER_ADMIN),
  InstitutionController.delete
);

export default router;