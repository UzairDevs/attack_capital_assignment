import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import prisma from '../models';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: 'Authentication required' });
    return;                // ← return undefined, so Promise<void>
  }

  const token = header.split(' ')[1];
  try {
    const { userId } = jwt.verify(token, config.jwtSecret) as { userId: number };
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;              // ← again, no return value
    }

    req.user = user;
    next();                // ← call next() and fall off, returns void
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
