import React, { useEffect, useState } from 'react';
import { X, Cpu, CheckCircle2, AlertTriangle, Play, RefreshCw, Terminal, Info } from 'lucide-react';
import { api } from '../services/api';
import { AIModelRecord, Project } from '../types';

interface AIModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProject: Project | null;
}

export const AIModelModal: React.FC<AIModelModalProps> = ({
  isOpen,
  onClose,
  activeProject,
}) => {
  const [models, setModels] = useState<AIModelRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [inferenceStatus, setInferenceStatus] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<any | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadModels();
    }
  }, [isOpen]);

  const loadModels = async () => {
    try {
      setLoading(true);
      const res = await api.getAIModels();
      setModels(res.data);
      if (res.data.length > 0) {
        setSelectedModelId(res.data[0].id);
      }
    } catch (err) {
      console.error('Failed to load AI models:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleTriggerInference = async () => {
    if (!activeProject || !selectedModelId) return;

    try {
      setInferenceStatus('CHECKING_MODEL');
      setErrorDetails(null);

      const res = await api.triggerInference({
        projectId: activeProject.id,
        modelId: selectedModelId,
      });

      setInferenceStatus(`Inference started: ${res.message}`);
    } catch (err: any) {
      setInferenceStatus('FAILED');
      setErrorDetails(err.message || 'Model weights are not currently deployed on disk.');
    }
  };

  const selectedModel = models.find((m) => m.id === selectedModelId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-cadastral-950 border border-cadastral-700/50 text-cadastral-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-100">Deep Learning Model Registry & Pipeline</h3>
              <p className="text-[11px] text-slate-400">
                PyTorch semantic segmentation backbones for cadastral feature extraction.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* Strict AI Authenticity Banner */}
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 flex items-start space-x-2.5 text-slate-300">
            <Info className="w-4 h-4 text-cadastral-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-200">Zero Simulated Intelligence Policy</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                The platform verifies physical PyTorch model weight files on disk before running inference. If weights are missing, the system explicitly reports{' '}
                <span className="font-mono text-amber-300">MODEL_NOT_AVAILABLE</span> rather than fabricating artificial polygons or confidence scores.
              </p>
            </div>
          </div>

          {/* Model Selection List */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-300">Registered Deep Learning Architectures</label>
            <div className="grid grid-cols-2 gap-3">
              {models.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedModelId(m.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedModelId === m.id
                      ? 'bg-slate-800 border-cadastral-500 shadow-md ring-1 ring-cadastral-500/30'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-100">{m.name}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        m.status === 'APPROVED'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border-amber-800'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">Architecture: {m.architecture}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">Weights: {m.weights_path || 'None'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Specification & Metrics */}
          {selectedModel && (
            <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 space-y-2 font-mono text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Task:</span> <span className="text-slate-200">{selectedModel.task_type}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Target Classes:</span>{' '}
                <span className="text-slate-200">{selectedModel.classes.join(', ')}</span>
              </div>
              {selectedModel.evaluation_metrics && (
                <div className="pt-2 border-t border-slate-800/80 text-slate-300">
                  <div className="font-semibold text-cadastral-400 mb-1">Benchmark Evaluation Scores:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(selectedModel.evaluation_metrics).map(([k, v]) => (
                      <div key={k} className="bg-slate-900 p-1.5 rounded border border-slate-800">
                        <div className="text-[9px] text-slate-400 uppercase">{k}</div>
                        <div className="font-bold text-slate-100">{String(v)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feedback & Error Output */}
          {errorDetails && (
            <div className="p-3 rounded-lg bg-amber-950/50 border border-amber-800/60 text-amber-200 space-y-1">
              <div className="flex items-center space-x-1.5 font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>MODEL NOT AVAILABLE ON DISK</span>
              </div>
              <p className="text-[11px] text-amber-300/90">{errorDetails}</p>
              <div className="text-[10px] font-mono bg-black/40 p-2 rounded mt-1.5 text-slate-300">
                CLI Training Command:
                <br />
                <span className="text-emerald-400">python ai-service/train.py --model unet --epochs 50</span>
              </div>
            </div>
          )}

          {inferenceStatus && !errorDetails && (
            <div className="p-2.5 rounded bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{inferenceStatus}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <button
              onClick={loadModels}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Registry</span>
            </button>

            <button
              onClick={handleTriggerInference}
              className="px-4 py-1.5 rounded-md bg-cadastral-600 hover:bg-cadastral-500 text-white font-medium flex items-center space-x-1.5 shadow transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Run Deep Learning Inference</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
