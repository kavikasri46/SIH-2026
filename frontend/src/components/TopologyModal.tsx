import React, { useEffect, useState } from 'react';
import { X, AlertTriangle, CheckCircle2, RefreshCw, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';
import { TopologyError, Project } from '../types';

interface TopologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProject: Project | null;
  onRefreshProject: () => void;
}

export const TopologyModal: React.FC<TopologyModalProps> = ({
  isOpen,
  onClose,
  activeProject,
  onRefreshProject,
}) => {
  const [errors, setErrors] = useState<TopologyError[]>([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && activeProject) {
      loadTopologyErrors();
    }
  }, [isOpen, activeProject]);

  const loadTopologyErrors = async () => {
    if (!activeProject) return;
    try {
      setLoading(true);
      const res = await api.getTopologyErrors(activeProject.id);
      setErrors(res.data);
    } catch (err) {
      console.error('Failed to load topology errors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunScan = async () => {
    if (!activeProject) return;
    try {
      setScanning(true);
      setScanMessage(null);
      const res = await api.runTopologyScan(activeProject.id);
      setScanMessage(res.message);
      await loadTopologyErrors();
      onRefreshProject();
    } catch (err: any) {
      alert(err.message || 'Failed to execute topology scan.');
    } finally {
      setScanning(false);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      await api.resolveTopologyError(id, 'Resolved via surveyor manual topology editor.');
      await loadTopologyErrors();
      onRefreshProject();
    } catch (err: any) {
      alert(err.message || 'Failed to resolve error.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-amber-950 border border-amber-700/50 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-100">GIS Topology Validation Engine</h3>
              <p className="text-[11px] text-slate-400">
                Automated detection of parcel boundary overlaps, slivers, and unclosed rings.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {scanMessage && (
            <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{scanMessage}</span>
            </div>
          )}

          {/* List of Topology Issues */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300">
                Identified Topology Issues ({errors.filter((e) => e.status === 'OPEN').length} Open)
              </span>
              <button
                onClick={handleRunScan}
                disabled={scanning}
                className="text-xs bg-cadastral-600 hover:bg-cadastral-500 text-white font-medium px-3 py-1 rounded flex items-center space-x-1.5 transition-colors shadow"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} />
                <span>{scanning ? 'Scanning...' : 'Run Topology Validation Scan'}</span>
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {errors.length === 0 ? (
                <div className="p-6 text-center text-slate-400 bg-slate-800/30 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="font-semibold text-slate-200">No Topology Errors Found</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    All candidate parcel polygons comply with cadastral non-overlapping and area constraints.
                  </p>
                </div>
              ) : (
                errors.map((err) => (
                  <div
                    key={err.id}
                    className={`p-3 rounded-lg border flex items-start justify-between space-x-3 ${
                      err.status === 'OPEN'
                        ? 'bg-amber-950/20 border-amber-800/50 text-slate-200'
                        : 'bg-slate-800/20 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-amber-300">{err.error_type}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded border font-mono ${
                            err.severity === 'HIGH'
                              ? 'bg-rose-950 text-rose-300 border-rose-800'
                              : 'bg-amber-950 text-amber-300 border-amber-800'
                          }`}
                        >
                          {err.severity}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                            err.status === 'OPEN' ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          {err.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">{err.description}</p>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Affected Features: {err.affected_feature_ids.join(', ')}
                      </div>
                    </div>

                    {err.status === 'OPEN' && (
                      <button
                        onClick={() => handleResolve(err.id)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 shrink-0 font-medium transition-colors"
                      >
                        Resolve
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
