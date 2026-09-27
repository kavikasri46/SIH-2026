import React, { useState, useEffect } from 'react';
import { GeoJSONFeature, FeatureStatus } from '../types';
import {
  ShieldAlert,
  ShieldCheck,
  Edit3,
  CheckCircle,
  XCircle,
  Smartphone,
  Save,
  Clock,
  Sparkles,
  MapPin,
  FileCheck,
  X
} from 'lucide-react';

interface FeatureInspectorProps {
  feature: GeoJSONFeature | null;
  onClose: () => void;
  onUpdateGeometry: (id: string, newCoords: number[][], notes?: string) => Promise<void>;
  onVerify: (id: string, action: 'APPROVE' | 'REJECT' | 'SEND_TO_FIELD', notes?: string) => Promise<void>;
  onOpenFieldVerification: (feature: GeoJSONFeature) => void;
}

export const FeatureInspector: React.FC<FeatureInspectorProps> = ({
  feature,
  onClose,
  onUpdateGeometry,
  onVerify,
  onOpenFieldVerification,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [coordsText, setCoordsText] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (feature) {
      setNotes(feature.properties.surveyorNotes || '');
      setIsEditing(false);

      if (feature.geometry.type === 'Polygon' && feature.geometry.coordinates[0]) {
        const ring = feature.geometry.coordinates[0];
        setCoordsText(
          ring.map((pt: number[]) => `${pt[0].toFixed(6)}, ${pt[1].toFixed(6)}`).join('\n')
        );
      }
    }
  }, [feature]);

  if (!feature) {
    return (
      <aside className="w-80 bg-slate-900/95 border-l border-slate-800 p-6 flex flex-col items-center justify-center text-center text-slate-400 select-none">
        <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-3">
          <MapPin className="w-5 h-5 text-slate-400" />
        </div>
        <div className="font-semibold text-sm text-slate-200">No Feature Selected</div>
        <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
          Click any candidate parcel or footprint on the WebGIS map to inspect geospatial attributes and verification workflows.
        </p>
      </aside>
    );
  }

  const props = feature.properties;
  const areaSqm = props.areaSqm || props.footprintAreaSqm || 0;
  const perimeterM = props.perimeterM || 0;

  const handleSaveGeometry = async () => {
    try {
      setIsSaving(true);
      const lines = coordsText.trim().split('\n');
      const newRing: number[][] = [];
      for (const line of lines) {
        const parts = line.split(',').map((s) => parseFloat(s.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          newRing.push([parts[0], parts[1]]);
        }
      }

      if (newRing.length < 3) {
        alert('A valid polygon boundary requires at least 3 coordinate vertices.');
        return;
      }

      // Ensure ring closure
      const first = newRing[0];
      const last = newRing[newRing.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        newRing.push([first[0], first[1]]);
      }

      await onUpdateGeometry(feature.id, newRing, notes);
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message || 'Failed to update geometry.');
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status: FeatureStatus) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>Legally Approved</span>
          </span>
        );
      case 'FIELD_VERIFIED':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-700/60">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>Field Ground-Truthed</span>
          </span>
        );
      case 'HUMAN_EDITED':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-950/80 text-blue-300 border border-blue-700/60">
            <Edit3 className="w-3 h-3 text-blue-400" />
            <span>Surveyor Edited</span>
          </span>
        );
      case 'AI_GENERATED':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-950/80 text-purple-300 border border-purple-700/60">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>AI Candidate</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-950/80 text-rose-300 border border-rose-700/60">
            <XCircle className="w-3 h-3 text-rose-400" />
            <span>Rejected</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="w-80 bg-slate-900/95 border-l border-slate-800 flex flex-col h-[calc(100vh-3.5rem)] text-xs overflow-hidden">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-850">
        <div>
          <div className="text-[10px] uppercase font-mono text-slate-400">Cadastral Feature Inspector</div>
          <div className="text-sm font-bold text-slate-100">{props.parcelNumber || feature.id}</div>
        </div>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {/* Status & Confidence Banner */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Workflow Status:</span>
            {getStatusBadge(props.status)}
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-2.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">AI Confidence:</span>
              <span
                className={`font-mono font-bold text-xs ${
                  props.confidenceScore && props.confidenceScore > 80
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                }`}
              >
                {props.confidenceScore ? `${props.confidenceScore}% (${props.confidenceLevel})` : 'UNAVAILABLE'}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-start space-x-1.5 pt-1 border-t border-slate-700/40">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {props.status === 'APPROVED'
                  ? 'Official Cadastral Record verified by licensed surveyor.'
                  : 'Candidate geometry requires physical ground truthing prior to legal registration.'}
              </span>
            </div>
          </div>
        </div>

        {/* Spatial Measurements */}
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Spatial Dimensions</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800/40 border border-slate-700/50 p-2 rounded">
              <div className="text-[10px] text-slate-400">Planar Area</div>
              <div className="text-sm font-mono font-bold text-slate-100">
                {areaSqm.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">m²</span>
              </div>
              <div className="text-[10px] text-slate-400">{(areaSqm / 10000).toFixed(4)} Ha</div>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 p-2 rounded">
              <div className="text-[10px] text-slate-400">Perimeter</div>
              <div className="text-sm font-mono font-bold text-slate-100">
                {perimeterM.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">m</span>
              </div>
              <div className="text-[10px] text-slate-400">Boundary perimeter</div>
            </div>
          </div>
        </div>

        {/* Vertex Coordinate Editor */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
              Boundary Vertices (WGS84)
            </span>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[11px] text-cadastral-400 hover:text-cadastral-300 font-medium flex items-center space-x-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Vertices'}</span>
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={coordsText}
                onChange={(e) => setCoordsText(e.target.value)}
                rows={6}
                className="w-full bg-slate-950 border border-cadastral-500 rounded p-2 text-[10px] font-mono text-emerald-400 focus:outline-none"
                placeholder="lng, lat per line..."
              />
              <button
                onClick={handleSaveGeometry}
                disabled={isSaving}
                className="w-full bg-cadastral-600 hover:bg-cadastral-500 text-white font-medium py-1.5 rounded flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Apply Vertex Changes'}</span>
              </button>
            </div>
          ) : (
            <div className="bg-slate-950/70 border border-slate-800 rounded p-2 max-h-24 overflow-y-auto font-mono text-[10px] text-slate-300 space-y-0.5">
              {feature.geometry.type === 'Polygon' &&
                feature.geometry.coordinates[0]?.map((pt: number[], idx: number) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-slate-400">V{idx + 1}:</span>
                    <span>
                      {pt[0].toFixed(6)}, {pt[1].toFixed(6)}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Surveyor Notes */}
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Surveyor Field Notes</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cadastral-500"
            placeholder="Enter ground observation or boundary dispute remarks..."
          />
        </div>

        {/* Provenance Metadata */}
        {props.provenance && (
          <div className="bg-slate-800/30 border border-slate-800 rounded p-2 space-y-1 text-[10px] text-slate-400 font-mono">
            <div className="font-semibold text-slate-300">Model Provenance:</div>
            <div>Model: {props.provenance.model_name || 'CadastralSegFormer-Urban-v1.2'}</div>
            <div>Inferred: {props.provenance.inferred_at?.split('T')[0] || '2026-09-27'}</div>
            {props.provenance.verified_by && <div>Verified By: {props.provenance.verified_by}</div>}
          </div>
        )}
      </div>

      {/* Surveyor Action Toolbar */}
      <div className="p-3 border-t border-slate-800 bg-slate-850 space-y-2">
        <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Verification Actions</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onVerify(feature.id, 'APPROVE', notes)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-1.5 rounded flex items-center justify-center space-x-1 text-xs transition-colors shadow"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Approve Parcel</span>
          </button>

          <button
            onClick={() => onVerify(feature.id, 'REJECT', notes)}
            className="bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700/60 font-medium py-1.5 rounded flex items-center justify-center space-x-1 text-xs transition-colors"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Reject</span>
          </button>
        </div>

        <button
          onClick={() => onOpenFieldVerification(feature)}
          className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/50 font-medium py-1.5 rounded flex items-center justify-center space-x-1.5 text-xs transition-colors"
        >
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span>Launch Field Ground-Truthing</span>
        </button>
      </div>
    </aside>
  );
};
