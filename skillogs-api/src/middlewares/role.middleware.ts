import { Request, Response, NextFunction } from 'express';
import { Role } from '../enums/Role';

export const requireRole =
  (roles: Role | Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    // SUPER_ADMIN bypass (plateforme)
    if (user.role === Role.SUPER_ADMIN) {
      return next();
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };