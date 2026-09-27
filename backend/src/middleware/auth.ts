import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { UserRole } from '../types/index.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    fullName: string;
  };
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'AUTHENTICATION_REQUIRED',
      message: 'Access denied. Valid Bearer token required in Authorization header.'
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as any;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      fullName: decoded.fullName,
    };
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: 'INVALID_TOKEN',
      message: 'Session token has expired or is invalid. Please log in again.'
    });
    return;
  }
}

export function requireRole(allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication is required to access this resource.'
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: 'FORBIDDEN_ROLE',
        message: `Role '${req.user.role}' is not authorized. Required: [${allowedRoles.join(', ')}]`
      });
      return;
    }

    next();
  };
}
