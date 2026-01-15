import { Request, Response } from 'express';
import { ModuleService } from '../services/module.service';

const moduleService = new ModuleService();

export class ModuleController {
  static async create(req: Request, res: Response) {
    try {
      const module = await moduleService.create({
        title: req.body.title,
        description: req.body.description,
        order: req.body.order,
        trainingId: req.body.trainingId,
        institution: req.institution!,
      });

      return res.status(201).json(module);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const trainingId = Number(req.params.trainingId);
      const modules = await moduleService.findAll(
        trainingId,
        req.institution!
      );

      return res.json(modules);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const module = await moduleService.findOne(
        id,
        req.institution!
      );

      if (!module) {
        return res.status(404).json({
          message: 'Module not found',
        });
      }

      return res.json(module);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const module = await moduleService.update(
        id,
        req.institution!,
        req.body
      );

      return res.json(module);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await moduleService.remove(
        id,
        req.institution!
      );

      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}