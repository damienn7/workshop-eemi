import { Request, Response } from 'express';
import { InstitutionService } from '../services/institution.service';

const institutionService = new InstitutionService();

export class InstitutionController {
  static async create(req: Request, res: Response) {
    try {
      const institution = await institutionService.create(req.body);
      return res.status(201).json(institution);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async findAll(_: Request, res: Response) {
    const institutions = await institutionService.findAll();
    return res.json(institutions);
  }

  static async findOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const institution = await institutionService.findById(id);
      return res.json(institution);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const institution = await institutionService.update(id, req.body);
      return res.json(institution);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await institutionService.delete(id);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}