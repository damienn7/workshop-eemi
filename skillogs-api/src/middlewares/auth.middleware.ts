import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface JwtPayload {
  id: number;
  role: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Vérifier la présence du header
  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization header missing',
    });
  }

  // 2️⃣ Vérifier le format Bearer
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Invalid authorization format',
    });
  }

  try {
    // 3️⃣ Vérifier le token
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    // 4️⃣ Attacher l'utilisateur à la requête
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};
