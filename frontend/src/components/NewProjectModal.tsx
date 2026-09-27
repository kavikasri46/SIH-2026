import React, { useState } from 'react';
import { X, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { Project } from '../types';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onProjectCreated,
}) => {
  const [name, setName] = useState('');
  const [surveyArea, setSurveyArea] = useState('');
  const [district, setDistrict] = useState('Bengaluru Urban');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [description, setDescription] = useState('');
  const [crs, setCrs] = useState('EPSG:4326');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !surveyArea || !district || !city || !state) {
      setError('Please fill in all mandatory survey fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.createProject({
        name,
        surveyArea,
        district,
        city,
        state,
        description,
        crs,
        bbox: [77.585, 12.965, 77.599, 12.978],
      });

      const newProj = res.data;

      if (file) {
        const formData = new FormData();
        formData.append('imageryFile', file);
        await api.uploadImagery(newProj.id, formData);
      }

      onProjectCreated(newProj);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create survey project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
          <div>
            <h3 className="font-semibold text-sm text-slate-100">Create Cadastral Survey Project</h3>
            <p className="text-[11px] text-slate-400">Initialize a new UAV drone orthomosaic mapping mission.</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {error && (
            <div className="p-2.5 rounded bg-rose-950/60 border border-rose-800/60 text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-medium mb-1">Project / Mission Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ward 18 Revenue Cadastral Resurvey"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-100 focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Survey Area Coverage *</label>
              <input
                type="text"
                required
                placeholder="e.g. 2.15 sq.km"
                value={surveyArea}
                onChange={(e) => setSurveyArea(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-100 focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Coordinate Reference (CRS) *</label>
              <select
                value={crs}
                onChange={(e) => setCrs(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-100 focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
              >
                <option value="EPSG:4326">EPSG:4326 (WGS84 Lat/Lng)</option>
                <option value="EPSG:32643">EPSG:32643 (UTM Zone 43N)</option>
                <option value="EPSG:3857">EPSG:3857 (Web Mercator)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">District *</label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-100 focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">City *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-100 focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">State *</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-100 focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">UAV Drone Orthomosaic (GeoTIFF / TIFF)</label>
            <div className="border border-dashed border-slate-700 hover:border-cadastral-500 rounded-lg p-3 text-center bg-slate-800/40 cursor-pointer">
              <input
                type="file"
                accept=".tif,.tiff,.geotiff,.jpg,.png"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="hidden"
                id="ortho-upload"
              />
              <label htmlFor="ortho-upload" className="cursor-pointer block">
                <Upload className="w-5 h-5 text-cadastral-400 mx-auto mb-1" />
                <span className="text-slate-300 font-medium">
                  {file ? file.name : 'Click to select high-resolution drone orthomosaic'}
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">
                  Supports GeoTIFF, TIFF with embedded geographic metadata (Max 500MB)
                </span>
              </label>
            </div>
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
              className="px-4 py-1.5 rounded-md bg-cadastral-600 hover:bg-cadastral-500 text-white font-medium shadow"
            >
              {isSubmitting ? 'Creating...' : 'Initialize Survey'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
