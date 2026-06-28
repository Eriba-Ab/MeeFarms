import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Define a more specific user type later
    }
  }
}
