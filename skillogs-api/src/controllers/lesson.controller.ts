import { Request, Response } from 'express';
import { LessonService } from '../services/lesson.service';

const lessonService = new LessonService();

export class LessonController {
  static async create(req: Request, res: Response) {
    try {
      const lesson = await lessonService.create(req.body);
      return res.status(201).json(lesson);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async findAllByModule(req: Request, res: Response) {
    const moduleId = Number(req.params.moduleId);
    const lessons = await lessonService.findAllByModule(moduleId);
    return res.json(lessons);
  }

  static async findOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const lesson = await lessonService.findById(id);
      return res.json(lesson);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

    static async findBySlug(req: Request, res: Response) {
        try {
            const moduleSlug = req.params.moduleSlug;
            const lessonSlug = req.params.lessonSlug;

            if (typeof moduleSlug !== 'string' || typeof lessonSlug !== 'string') {
            return res.status(400).json({
                message: 'Invalid slug parameters',
            });
            }

            const lesson = await lessonService.findBySlug(
                moduleSlug,
                lessonSlug
            );

            return res.json(lesson);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const lesson = await lessonService.update(id, req.body);
      return res.json(lesson);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await lessonService.delete(id);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}