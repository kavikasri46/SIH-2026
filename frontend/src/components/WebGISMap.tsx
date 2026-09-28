import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { GeoJSONFeature, GeoJSONFeatureCollection, LayerVisibility } from '../types';
import { ZoomIn, ZoomOut, Maximize, Crosshair } from 'lucide-react';

interface WebGISMapProps {
  parcels: GeoJSONFeatureCollection | null;
  buildings: GeoJSONFeatureCollection | null;
  roads: GeoJSONFeatureCollection | null;
  layers: LayerVisibility;
  selectedFeature: GeoJSONFeature | null;
  onSelectFeature: (feature: GeoJSONFeature | null) => void;
  center?: [number, number];
  zoom?: number;
}

export const WebGISMap: React.FC<WebGISMapProps> = ({
  parcels,
  buildings,
  roads,
  layers,
  selectedFeature,
  onSelectFeature,
  center = [82.968, 25.314],
  zoom = 16.5,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [coords, setCoords] = useState<{ lng: number; lat: number }>({ lng: center[0], lat: center[1] });
  const [currentZoom, setCurrentZoom] = useState<number>(zoom);

  // Initialize MapLibre
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: [
              'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            maxzoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
          },
          'satellite-tiles': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            maxzoom: 19,
            attribution: 'Esri World Imagery, Maxar, Earthstar Geographics',
          },
        },
        layers: [
          {
            id: 'satellite-layer',
            type: 'raster',
            source: 'satellite-tiles',
            minzoom: 0,
            maxzoom: 19,
          },
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19,
            layout: {
              visibility: 'none',
            },
          },
        ],
      },
      center: center,
      zoom: 16.5,
      maxZoom: 19,
    });

    map.current.on('mousemove', (e) => {
      setCoords({
        lng: Math.round(e.lngLat.lng * 1000000) / 1000000,
        lat: Math.round(e.lngLat.lat * 1000000) / 1000000,
      });
    });

    map.current.on('zoom', () => {
      if (map.current) {
        setCurrentZoom(Math.round(map.current.getZoom() * 10) / 10);
      }
    });

    map.current.on('load', () => {
      // 1. Parcels Source & Layers
      map.current?.addSource('parcels-source', {
        type: 'geojson',
        data: (parcels as any) || { type: 'FeatureCollection', features: [] },
      });

      map.current?.addLayer({
        id: 'parcels-fill',
        type: 'fill',
        source: 'parcels-source',
        paint: {
          'fill-color': [
            'match',
            ['get', 'status'],
            'APPROVED', '#10b981',
            'FIELD_VERIFIED', '#06b6d4',
            'HUMAN_EDITED', '#3b82f6',
            'AI_GENERATED', '#8b5cf6',
            '#64748b'
          ],
          'fill-opacity': 0.35,
        },
      });

      map.current?.addLayer({
        id: 'parcels-line',
        type: 'line',
        source: 'parcels-source',
        paint: {
          'line-color': [
            'match',
            ['get', 'status'],
            'APPROVED', '#059669',
            'FIELD_VERIFIED', '#0891b2',
            'HUMAN_EDITED', '#2563eb',
            'AI_GENERATED', '#7c3aed',
            '#475569'
          ],
          'line-width': 2,
        },
      });

      // 2. Buildings Source & Layer
      map.current?.addSource('buildings-source', {
        type: 'geojson',
        data: (buildings as any) || { type: 'FeatureCollection', features: [] },
      });

      map.current?.addLayer({
        id: 'buildings-fill',
        type: 'fill',
        source: 'buildings-source',
        paint: {
          'fill-color': '#f59e0b',
          'fill-opacity': 0.6,
        },
      });

      map.current?.addLayer({
        id: 'buildings-line',
        type: 'line',
        source: 'buildings-source',
        paint: {
          'line-color': '#b45309',
          'line-width': 1.5,
        },
      });

      // 3. Roads Source & Layer
      map.current?.addSource('roads-source', {
        type: 'geojson',
        data: (roads as any) || { type: 'FeatureCollection', features: [] },
      });

      map.current?.addLayer({
        id: 'roads-line',
        type: 'line',
        source: 'roads-source',
        paint: {
          'line-color': '#f43f5e',
          'line-width': 4,
          'line-opacity': 0.85,
        },
      });

      // Click event for parcel feature selection
      map.current?.on('click', 'parcels-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const rawFeat = e.features[0];
          const feature: GeoJSONFeature = {
            type: 'Feature',
            id: rawFeat.id as string,
            geometry: rawFeat.geometry as any,
            properties: rawFeat.properties as any,
          };
          onSelectFeature(feature);
        }
      });

      map.current?.on('mouseenter', 'parcels-fill', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current?.on('mouseleave', 'parcels-fill', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update Data Sources dynamically
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    const pSrc = map.current.getSource('parcels-source') as maplibregl.GeoJSONSource;
    if (pSrc && parcels) {
      pSrc.setData(parcels as any);
    }

    const bSrc = map.current.getSource('buildings-source') as maplibregl.GeoJSONSource;
    if (bSrc && buildings) {
      bSrc.setData(buildings as any);
    }

    const rSrc = map.current.getSource('roads-source') as maplibregl.GeoJSONSource;
    if (rSrc && roads) {
      rSrc.setData(roads as any);
    }
  }, [parcels, buildings, roads]);

  // Update Layer Visibility dynamically
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    map.current.setLayoutProperty('parcels-fill', 'visibility', layers.parcels ? 'visible' : 'none');
    map.current.setLayoutProperty('parcels-line', 'visibility', layers.parcels ? 'visible' : 'none');
    map.current.setLayoutProperty('buildings-fill', 'visibility', layers.buildings ? 'visible' : 'none');
    map.current.setLayoutProperty('buildings-line', 'visibility', layers.buildings ? 'visible' : 'none');
    map.current.setLayoutProperty('roads-line', 'visibility', layers.roads ? 'visible' : 'none');
    map.current.setLayoutProperty('satellite-layer', 'visibility', layers.orthomosaic ? 'visible' : 'none');
    map.current.setLayoutProperty('osm-layer', 'visibility', !layers.orthomosaic ? 'visible' : 'none');
  }, [layers]);

  // Fly to selected feature
  useEffect(() => {
    if (!map.current || !selectedFeature) return;

    if (selectedFeature.geometry.type === 'Polygon') {
      const coords = selectedFeature.geometry.coordinates[0];
      if (coords && coords.length > 0) {
        const center = coords[0];
        map.current.flyTo({
          center: [center[0], center[1]],
          zoom: 17.5,
          essential: true,
        });
      }
    }
  }, [selectedFeature]);

  return (
    <div className="relative flex-1 h-[calc(100vh-3.5rem)] bg-slate-950 overflow-hidden">
      {/* MapLibre DOM Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Map Control Buttons Floating */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-lg shadow-xl backdrop-blur-sm">
        <button
          onClick={() => map.current?.zoomIn()}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => map.current?.zoomOut()}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="h-px bg-slate-800 my-0.5" />
        <button
          onClick={() => {
            if (map.current) {
              map.current.flyTo({ center, zoom });
            }
          }}
          className="p-1.5 text-slate-300 hover:text-cadastral-400 hover:bg-slate-800 rounded transition-colors"
          title="Reset Extent"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Coordinates & Scale Status Bar */}
      <div className="absolute bottom-2 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-md text-[11px] font-mono text-slate-300 shadow-lg backdrop-blur-sm pointer-events-auto">
          <div className="flex items-center space-x-1">
            <Crosshair className="w-3.5 h-3.5 text-cadastral-400" />
            <span>
              WGS84: {coords.lat.toFixed(6)}° N, {coords.lng.toFixed(6)}° E
            </span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div>Zoom: {currentZoom}x</div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="text-slate-400">EPSG:4326</div>
        </div>

        {/* Legend Overlay */}
        <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-md text-[10px] text-slate-300 shadow-lg backdrop-blur-sm pointer-events-auto">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" />
            <span>Approved</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded bg-cyan-500 inline-block" />
            <span>Field Verified</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded bg-blue-500 inline-block" />
            <span>Surveyor Edited</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded bg-purple-500 inline-block" />
            <span>AI Candidate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
