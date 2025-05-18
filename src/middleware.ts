import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from './models/user'; // Adjust the import path as necessary

const jwtSecret = process.env.JWT_SECRET_KEY as string;

interface JwtPayload {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

async function jwtCheck (req: Request, res: Response, next: NextFunction): Promise<any> {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const { email } = decoded;
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

export default {
  jwtCheck
};