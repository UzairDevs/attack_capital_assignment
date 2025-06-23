// tell TS that whenever you import from 'express', Request has .user
import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        // you can add other properties you set on req.user, e.g. email?: string
      }
    }
  }
}
