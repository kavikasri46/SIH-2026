import React, { useEffect, useState } from 'react';
import { X, FileText, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { api } from '../services/api';
import { Project, GeoJSONFeatureCollection } from '../types';

interface CadastralReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProject: Project | null;
  parcels: GeoJSONFeatureCollection | null;
}

export const CadastralReportModal: React.FC<CadastralReportModalProps> = ({
  isOpen,
  onClose,
  activeProject,
  parcels,
}) => {
  const [summary, setSummary] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && activeProject) {
      loadSummary();
    }
  }, [isOpen, activeProject]);

  const loadSummary = async () => {
    if (!activeProject) return;
    try {
      setLoading(true);
      const res = await api.getProjectSummary(activeProject.id);
      setSummary(res.data);
    } catch (err) {
      console.error('Failed to load project summary:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !activeProject) return null;

  const handleExportGeoJSON = () => {
    if (!parcels) return;
    const jsonStr = JSON.stringify(parcels, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeProject.name.toLowerCase().replace(/\s+/g, '_')}_cadastral_parcels.geojson`;
    a.click();
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(8, 47, 73);
    doc.rect(0, 0, 210, 32, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('GOVERNMENT CADASTRAL SURVEY & RESURVEY REPORT', 14, 15);
    doc.setFontSize(9);
    doc.text(`Project: ${activeProject.name} | AeroCadastre AI Automated WebGIS Platform`, 14, 24);

    // Survey Details Table
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(11);
    doc.text('1. Project & Drone Survey Parameters', 14, 42);

    autoTable(doc, {
      startY: 46,
      head: [['Parameter', 'Specification / Value']],
      body: [
        ['Survey Area', activeProject.survey_area],
        ['Administrative Division', `${activeProject.city}, ${activeProject.district}, ${activeProject.state}`],
        ['Coordinate Reference System (CRS)', activeProject.crs],
        ['Sensor Platform', 'UAV Drone Orthomosaic (5cm GSD)'],
        ['Survey Status', activeProject.status],
        ['Report Generated', new Date().toLocaleString()],
      ],
      theme: 'grid',
      headStyles: { fillColor: [2, 132, 199] },
    });

    // Statistical Summary Table
    const lastY = (doc as any).lastAutoTable.finalY || 100;
    doc.text('2. Cadastral Feature Extraction & Topology Metrics', 14, lastY + 12);

    const m = summary?.metrics;
    autoTable(doc, {
      startY: lastY + 16,
      head: [['Metric Description', 'Count / Dimension', 'Verification Status']],
      body: [
        ['Total Candidate Parcels Extracted', `${m?.totalParcels ?? 0} Parcels`, 'AI + Human Hybrid'],
        ['Total Surveyed Planar Area', `${m?.totalParcelAreaSqm?.toLocaleString() ?? 0} m² (${((m?.totalParcelAreaSqm || 0) / 10000).toFixed(4)} Ha)`, 'Geodesic Calculated'],
        ['Legally Approved Parcels', `${m?.statusBreakdown?.APPROVED ?? 0}`, 'Surveyor Approved'],
        ['Field Ground-Truthed Parcels', `${m?.statusBreakdown?.FIELD_VERIFIED ?? 0}`, 'dGPS GNSS Verified'],
        ['Identified Building Footprints', `${m?.totalBuildings ?? 0} Buildings`, `${m?.totalBuildingFootprintSqm ?? 0} m²`],
        ['Extracted Road Corridors', `${m?.totalRoads ?? 0} Road segments`, `${m?.totalRoadLengthM ?? 0} m`],
        ['Open Topology Inconsistencies', `${m?.openTopologyIssues ?? 0}`, m?.openTopologyIssues === 0 ? 'Passed (0 Overlaps)' : 'Action Required'],
      ],
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42] },
    });

    // Signatures
    const signY = (doc as any).lastAutoTable.finalY + 25;
    doc.setFontSize(9);
    doc.text('_____________________________________', 14, signY);
    doc.text('Superintending Surveyor & Cadastral Lead', 14, signY + 6);

    doc.text('_____________________________________', 125, signY);
    doc.text('Geospatial Analytics & Quality Assurance Officer', 125, signY + 6);

    doc.save(`${activeProject.name.toLowerCase().replace(/\s+/g, '_')}_cadastral_report.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-xl overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-700/50 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-100">Cadastral Survey Analytics & Exports</h3>
              <p className="text-[11px] text-slate-400">Generate certified PDF cadastral reports and GeoJSON vector packages.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {summary && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3 space-y-1">
                <div className="text-[10px] text-slate-400">Parcels Under Survey</div>
                <div className="text-xl font-bold text-slate-100">{summary.metrics?.totalParcels}</div>
                <div className="text-[10px] text-emerald-400">
                  {summary.metrics?.verificationRatePercent}% ground-truth completion rate
                </div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3 space-y-1">
                <div className="text-[10px] text-slate-400">Survey Area Extent</div>
                <div className="text-xl font-bold text-slate-100">
                  {summary.metrics?.totalParcelAreaSqm?.toLocaleString()} <span className="text-xs font-normal">m²</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {((summary.metrics?.totalParcelAreaSqm || 0) / 10000).toFixed(3)} Hectares
                </div>
              </div>
            </div>
          )}

          <div className="p-3 bg-slate-800/30 border border-slate-800 rounded-lg space-y-2">
            <div className="font-semibold text-slate-200">Legal Provenance Standard</div>
            <p className="text-[11px] text-slate-400">
              All generated exports clearly partition candidate boundaries into explicit tiers:{' '}
              <span className="font-mono text-purple-300">AI_GENERATED</span>,{' '}
              <span className="font-mono text-blue-300">HUMAN_EDITED</span>,{' '}
              <span className="font-mono text-cyan-300">FIELD_VERIFIED</span>, and{' '}
              <span className="font-mono text-emerald-300">APPROVED</span>.
            </p>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-3">
            <button
              onClick={handleExportGeoJSON}
              className="px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-cadastral-400" />
              <span>Export GeoJSON Layers</span>
            </button>

            <button
              onClick={handleGeneratePDF}
              className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center justify-center space-x-1.5 shadow transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Download Cadastral PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
