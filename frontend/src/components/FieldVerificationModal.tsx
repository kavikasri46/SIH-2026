import React, { useState } from 'react';
import { X, Smartphone, MapPin, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { GeoJSONFeature, Project } from '../types';

interface FieldVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: GeoJSONFeature | null;
  activeProject: Project | null;
  onVerificationSubmitted: () => void;
}

export const FieldVerificationModal: React.FC<FieldVerificationModalProps> = ({
  isOpen,
  onClose,
  feature,
  activeProject,
  onVerificationSubmitted,
}) => {
  const [gpsLat, setGpsLat] = useState<number>(12.9676);
  const [gpsLng, setGpsLng] = useState<number>(77.5878);
  const [accuracy, setAccuracy] = useState<number>(0.04); // 4cm dGPS GNSS accuracy
  const [boundaryAgreed, setBoundaryAgreed] = useState<boolean>(true);
  const [officerNotes, setOfficerNotes] = useState<string>('Physical corner stones inspected and verified on-site.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !feature || !activeProject) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await api.submitFieldSurvey({
        parcelId: feature.id,
        projectId: activeProject.id,
        gpsLat,
        gpsLng,
        gpsAccuracyM: accuracy,
        boundaryAgreed,
        officerNotes,
        photos: ['sample_survey_peg_north_east.jpg'],
      });

      onVerificationSubmitted();
      onClose();
    } catch (err: any) {
      alert(err.message || 'Failed to submit field ground truth record.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-700/50 text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-100">Field Ground-Truthing Dispatch</h3>
              <p className="text-[11px] text-slate-400">
                Record on-site dGPS coordinates, survey photos, and physical beacon consensus.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-lg space-y-1 text-slate-300 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Target Parcel:</span>
              <span className="font-bold text-slate-100">{feature.properties.parcelNumber || feature.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Survey Area:</span>
              <span>{activeProject.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">GNSS Latitude (°N) *</label>
              <input
                type="number"
                step="0.000001"
                required
                value={gpsLat}
                onChange={(e) => setGpsLat(parseFloat(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-100 font-mono focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">GNSS Longitude (°E) *</label>
              <input
                type="number"
                step="0.000001"
                required
                value={gpsLng}
                onChange={(e) => setGpsLng(parseFloat(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-100 font-mono focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">dGPS Estimated Accuracy (Meters)</label>
            <input
              type="number"
              step="0.01"
              value={accuracy}
              onChange={(e) => setAccuracy(parseFloat(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-100 font-mono focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
            />
          </div>

          <div className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-200">Physical Boundary Agreed</div>
              <div className="text-[10px] text-slate-400">Adjacent landowner & surveyor consensus</div>
            </div>
            <input
              type="checkbox"
              checked={boundaryAgreed}
              onChange={(e) => setBoundaryAgreed(e.target.checked)}
              className="w-4 h-4 rounded text-cadastral-600 bg-slate-900 border-slate-700 focus:ring-cadastral-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Field Observation Remarks</label>
            <textarea
              rows={2}
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-slate-100 placeholder-slate-400 focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1.5 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow"
            >
              {isSubmitting ? 'Recording...' : 'Submit Ground Truth Verification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
