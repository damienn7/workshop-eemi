import { Request, Response } from 'express';
import { TrainingService } from '../services/training.service';

export class TrainingController {
  private service = new TrainingService();

  /**
   * POST /trainings
   */
  create = async (req: Request, res: Response) => {
    const training = await this.service.create({
      title: req.body.title,
      description: req.body.description,
      level: req.body.level,
      institution: req.institution!,
      creatorId: req.user!.id,
    });

    res.status(201).json(training);
  };

  /**
   * GET /trainings
   */
  findAll = async (req: Request, res: Response) => {
    const trainings = await this.service.findAll(req.institution!);
    res.json(trainings);
  };

  /**
   * GET /trainings/:id
   */
  findOne = async (req: Request, res: Response) => {
    const training = await this.service.findOne(
      Number(req.params.id),
      req.institution!
    );

    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }

    res.json(training);
  };

  /**
   * PUT /trainings/:id
   */
  update = async (req: Request, res: Response) => {
    const training = await this.service.update(
      Number(req.params.id),
      req.institution!,
      req.body
    );

    res.json(training);
  };

  /**
   * DELETE /trainings/:id
   */
  remove = async (req: Request, res: Response) => {
    await this.service.remove(
      Number(req.params.id),
      req.institution!
    );

    res.status(204).send();
  };
}