import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { config } from '../config.js';
import { authenticateJWT, AuthRequest } from '../middleware/auth.js';

export const authRouter = Router();

// POST /api/auth/login
authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, error: 'Email and password are required.' });
    return;
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
  if (!user || !user.is_active) {
    res.status(401).json({ success: false, error: 'Invalid credentials or inactive account.' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    res.status(401).json({ success: false, error: 'Invalid credentials or inactive account.' });
    return;
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
    },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  // Record audit log
  db.prepare(`
    INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, new_value, ip_address)
    VALUES (?, ?, 'USER_LOGIN', 'USER', ?, ?, ?)
  `).run(uuidv4(), user.id, user.id, JSON.stringify({ email: user.email, role: user.role }), req.ip || '127.0.0.1');

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        department: user.department,
      },
    },
  });
});

// GET /api/auth/me
authRouter.get('/me', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const user = db.prepare('SELECT id, email, full_name, role, department, created_at FROM users WHERE id = ?').get(req.user!.id) as any;
  if (!user) {
    res.status(404).json({ success: false, error: 'User not found.' });
    return;
  }
  res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
      department: user.department,
      createdAt: user.created_at,
    },
  });
});

// POST /api/auth/register (Admin only)
authRouter.post('/register', authenticateJWT, async (req: AuthRequest, res: Response): Promise<void> => {
  if (req.user?.role !== 'ADMIN') {
    res.status(403).json({ success: false, error: 'Only Administrators can register new cadastral officers.' });
    return;
  }

  const { email, password, fullName, role, department } = req.body;
  if (!email || !password || !fullName || !role) {
    res.status(400).json({ success: false, error: 'Email, password, fullName, and role are required.' });
    return;
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    res.status(409).json({ success: false, error: 'A user with this email already exists.' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newId = uuidv4();

  db.prepare(`
    INSERT INTO users (id, email, password_hash, full_name, role, department)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(newId, email, passwordHash, fullName, role, department || null);

  res.status(201).json({
    success: true,
    data: { id: newId, email, fullName, role, department },
  });
});
