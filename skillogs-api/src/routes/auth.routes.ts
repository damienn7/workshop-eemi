import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validateBody.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { Role } from '../enums/Role';
import {
  loginSchema,
  registerSchema,
} from '../schemas/auth.schema';

const authRoutes = Router();

/**
 * =========================
 * PUBLIC ROUTES
 * =========================
 */

/**
 * Login
 */
authRoutes.post(
  '/login',
  validateBody(loginSchema),
  AuthController.login
);

/**
 * Register (creates PENDING user + registration request)
 */
authRoutes.post(
  '/register',
  validateBody(registerSchema),
  AuthController.register
);

/**
 * =========================
 * PROTECTED ROUTES
 * =========================
 */

/**
 * Approve a registration request
 * ADMIN (institution) or SUPER_ADMIN (platform)
 */
authRoutes.post(
  '/approve/:requestId',
  authMiddleware,
  requireRole([Role.ADMIN]),
  AuthController.approve
);

/**
 * Get current authenticated user
 */
authRoutes.get(
  '/me',
  authMiddleware,
  AuthController.me
);

export default authRoutes;