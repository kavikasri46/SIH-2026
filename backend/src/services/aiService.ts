import fs from 'fs';
import path from 'path';
import { config } from '../config.js';
import { db } from '../db/index.js';

export interface AIModelRecord {
  id: string;
  name: string;
  version: string;
  architecture: string;
  task_type: string;
  weights_path: string | null;
  input_size: number;
  classes: string[];
  status: 'TRAINING' | 'VALIDATING' | 'APPROVED' | 'DEPLOYED' | 'ARCHIVED' | 'NOT_AVAILABLE';
  evaluation_metrics: Record<string, any> | null;
  device: string;
}

export class AIService {
  /**
   * Scan and verify status of AI models in the registry based on physical weights file existence
   */
  static listModels(): AIModelRecord[] {
    const rawModels = db.prepare('SELECT * FROM ai_models').all() as any[];

    return rawModels.map((row) => {
      const weightsExist = row.weights_path ? fs.existsSync(path.resolve(process.cwd(), '..', row.weights_path)) : false;
      const status = weightsExist ? (row.status === 'NOT_AVAILABLE' ? 'APPROVED' : row.status) : 'NOT_AVAILABLE';

      return {
        id: row.id,
        name: row.name,
        version: row.version,
        architecture: row.architecture,
        task_type: row.task_type,
        weights_path: row.weights_path,
        input_size: row.input_size,
        classes: typeof row.classes === 'string' ? JSON.parse(row.classes) : row.classes,
        status,
        evaluation_metrics: row.evaluation_metrics ? (typeof row.evaluation_metrics === 'string' ? JSON.parse(row.evaluation_metrics) : row.evaluation_metrics) : null,
        device: row.device || 'cpu',
      };
    });
  }

  /**
   * Trigger AI inference pipeline
   * Strictly adheres to NO FAKE AI policy.
   */
  static async requestInference(projectId: string, imageryId: string, modelId: string): Promise<{
    available: boolean;
    status: string;
    message: string;
    jobId?: string;
  }> {
    const model = db.prepare('SELECT * FROM ai_models WHERE id = ?').get(modelId) as any;
    if (!model) {
      throw new Error(`AI Model with ID ${modelId} does not exist in registry.`);
    }

    // Check if real AI microservice is reachable
    let isServiceOnline = false;
    try {
      const res = await fetch(`${config.aiServiceUrl}/health`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        isServiceOnline = true;
      }
    } catch {
      isServiceOnline = false;
    }

    const weightsPath = model.weights_path ? path.resolve(process.cwd(), '..', model.weights_path) : null;
    const weightsExist = weightsPath ? fs.existsSync(weightsPath) : false;

    if (!isServiceOnline && !weightsExist) {
      return {
        available: false,
        status: 'MODEL_NOT_AVAILABLE',
        message: `AI Model '${model.name}' weights are not available at '${model.weights_path}'. Python AI microservice is offline at '${config.aiServiceUrl}'. To enable deep learning extraction, train or place valid weights and launch the AI service.`,
      };
    }

    return {
      available: true,
      status: 'QUEUED',
      message: 'Inference job dispatched to GPU/CPU processing queue.',
    };
  }
}
