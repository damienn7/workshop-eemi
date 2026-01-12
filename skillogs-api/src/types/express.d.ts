import 'express';
import { Role } from '../enums/Role';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: Role;
        institutionId: number | null;
      };
    }
  }
}

export {};
