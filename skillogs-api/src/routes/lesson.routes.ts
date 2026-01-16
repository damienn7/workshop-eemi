import { Router } from 'express';
import { LessonController } from '../controllers/lesson.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { validateBody } from '../middlewares/validateBody.middleware';
import {
  createLessonSchema,
  updateLessonSchema,
} from '../schemas/lesson.schema';
import { Role } from '../enums/Role';

const router = Router();

// 🔐 CRUD (admin / instructor)
router.post(
  '/',
  authMiddleware,
  requireRole([Role.ADMIN, Role.INSTRUCTOR]),
  validateBody(createLessonSchema),
  LessonController.create
);

router.put(
  '/:id',
  authMiddleware,
  requireRole([Role.ADMIN, Role.INSTRUCTOR]),
  validateBody(updateLessonSchema),
  LessonController.update
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole([Role.ADMIN, Role.INSTRUCTOR]),
  LessonController.delete
);

// 📖 Lecture
router.get('/module/:moduleId', LessonController.findAllByModule);
router.get('/slug/:moduleSlug/:lessonSlug', LessonController.findBySlug);
router.get('/:id', LessonController.findOne);

export default router;