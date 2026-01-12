import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { Role } from '../enums/Role';

interface JwtPayload {
  id: number;
  role: Role;
  institutionId?: number; // absent pour SUPER_ADMIN
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid authorization format' });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    // 🔐 Sécurité minimale
    if (!decoded.id || !decoded.role) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    // 🎯 Attacher le contexte utilisateur
    req.user = {
      id: decoded.id,
      role: decoded.role,
      institutionId: decoded.institutionId ?? null,
    };

    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
