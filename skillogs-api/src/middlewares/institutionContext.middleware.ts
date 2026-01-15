import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/datasource';
import { Institution } from '../entities/Institution';
import { env } from '../config/env';

const BASE_DOMAIN = env.BASE_DOMAIN;

export const institutionContext = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const host = req.headers.host?.split(':')[0]; // remove port

  if (!host || host === BASE_DOMAIN || host === `www.${BASE_DOMAIN}`) {
    // 🌍 Platform-level context
    req.institution = null;
    return next();
  }

  const subdomain = host.replace(`.${BASE_DOMAIN}`, '');

  const institutionRepo = AppDataSource.getRepository(Institution);
  const institution = await institutionRepo.findOne({
    where: { slug: subdomain },
  });

  if (!institution) {
    return res.status(404).json({
      message: 'Institution not found for this domain',
    });
  }

  req.institution = institution;
  next();
};