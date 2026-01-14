import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class InstitutionAdminController {
  static async create(req: Request, res: Response) {
    try {
      const institutionId = Number(req.params.id);

      const admin = await userService.createAdminForInstitution(
        institutionId,
        req.body
      );

      return res.status(201).json({
        message: 'Institution admin created successfully',
        adminId: admin.id,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}