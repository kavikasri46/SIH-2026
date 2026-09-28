import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'sih26012_default_secure_jwt_secret_change_in_production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_aG1JoOR6utPE@ep-morning-water-b4e7ryr9-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require',
  databasePath: process.env.DATABASE_PATH || path.resolve(process.cwd(), 'cadastral.sqlite'),
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8000',
  uploadDir: path.resolve(process.cwd(), process.env.UPLOAD_DIR || 'uploads'),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
