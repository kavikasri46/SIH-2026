import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { initDatabase } from './db/index.js';
import { runSeeds } from './db/seeds.js';

import { authRouter } from './routes/auth.js';
import { projectRouter } from './routes/projects.js';
import { imageryRouter } from './routes/imagery.js';
import { aiRouter } from './routes/ai.js';
import { gisRouter } from './routes/gis.js';
import { topologyRouter } from './routes/topology.js';
import { verificationRouter } from './routes/verification.js';
import { reportRouter } from './routes/reports.js';
import { auditRouter } from './routes/audit.js';
import { jobRouter } from './routes/jobs.js';

const app = express();

// Security & Parsing Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'SIH26012 Cadastral Backend Gateway',
    timestamp: new Date().toISOString(),
    nodeEnv: config.nodeEnv,
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/projects', imageryRouter);
app.use('/api/projects', reportRouter);
app.use('/api/ai', aiRouter);
app.use('/api/gis', gisRouter);
app.use('/api/projects', gisRouter);
app.use('/api/topology', topologyRouter);
app.use('/api/projects', topologyRouter);
app.use('/api', verificationRouter);
app.use('/api/audit', auditRouter);
app.use('/api/jobs', jobRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.name || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'An unexpected error occurred while processing the cadastral request.',
  });
});

async function startServer() {
  try {
    // 1. Initialize DB tables
    initDatabase();

    // 2. Seed initial reference data if empty
    await runSeeds();

    // 3. Start listening
    app.listen(config.port, () => {
      console.log(`=======================================================`);
      console.log(`🚀 SIH26012 Cadastral Gateway running on port ${config.port}`);
      console.log(`🌍 API Base: http://localhost:${config.port}/api`);
      console.log(`⚡ Environment: ${config.nodeEnv}`);
      console.log(`=======================================================`);
    });
  } catch (error) {
    console.error('Failed to start Cadastral Backend Server:', error);
    process.exit(1);
  }
}

startServer();
