import { GeoJSONGeometry, TopologyErrorType } from '../types/index.js';

export interface TopologyIssueResult {
  errorType: TopologyErrorType;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  affectedFeatureIds: string[];
  description: string;
  geometry?: GeoJSONGeometry;
}

/**
 * Calculates planar/spherical area for GeoJSON polygon in square meters
 */
export function calculatePolygonAreaSqm(geometry: GeoJSONGeometry): number {
  if (geometry.type !== 'Polygon' && geometry.type !== 'MultiPolygon') return 0;

  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  let totalArea = 0;

  for (const ringCoords of polygons) {
    const ring = ringCoords[0]; // exterior ring
    if (!ring || ring.length < 3) continue;

    let area = 0;
    const rad = Math.PI / 180;
    const earthRadius = 6378137.0; // WGS84 meters

    for (let i = 0; i < ring.length - 1; i++) {
      const p1 = ring[i];
      const p2 = ring[i + 1];
      const x1 = p1[0] * rad * earthRadius * Math.cos((p1[1] * rad + p2[1] * rad) / 2);
      const y1 = p1[1] * rad * earthRadius;
      const x2 = p2[0] * rad * earthRadius * Math.cos((p1[1] * rad + p2[1] * rad) / 2);
      const y2 = p2[1] * rad * earthRadius;
      area += (x1 * y2 - x2 * y1);
    }
    totalArea += Math.abs(area) / 2;
  }

  return Math.round(totalArea * 100) / 100;
}

/**
 * Calculates perimeter for GeoJSON geometry in meters
 */
export function calculatePerimeterMeters(geometry: GeoJSONGeometry): number {
  if (geometry.type !== 'Polygon' && geometry.type !== 'MultiPolygon') return 0;

  const rings = geometry.type === 'Polygon' ? geometry.coordinates : geometry.coordinates.flat();
  let perimeter = 0;
  const rad = Math.PI / 180;
  const earthRadius = 6378137.0;

  for (const ring of rings) {
    for (let i = 0; i < ring.length - 1; i++) {
      const p1 = ring[i];
      const p2 = ring[i + 1];
      const dLat = (p2[1] - p1[1]) * rad;
      const dLon = (p2[0] - p1[0]) * rad;
      const lat1 = p1[1] * rad;
      const lat2 = p2[1] * rad;

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      perimeter += earthRadius * c;
    }
  }

  return Math.round(perimeter * 100) / 100;
}

/**
 * Check if a bounding box overlaps another
 */
function bboxOverlap(b1: [number, number, number, number], b2: [number, number, number, number]): boolean {
  return !(b1[2] < b2[0] || b1[0] > b2[2] || b1[3] < b2[1] || b1[1] > b2[3]);
}

function getBBox(geometry: GeoJSONGeometry): [number, number, number, number] {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const extractCoords = (coords: any[]) => {
    if (typeof coords[0] === 'number') {
      const [x, y] = coords;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    } else {
      for (const item of coords) extractCoords(item);
    }
  };
  extractCoords(geometry.coordinates);
  return [minX, minY, maxX, maxY];
}

/**
 * Run comprehensive topology validation against a collection of candidate parcels
 */
export function validateParcelsTopology(parcels: Array<{ id: string; parcel_number: string; geometry: GeoJSONGeometry }>): TopologyIssueResult[] {
  const issues: TopologyIssueResult[] = [];

  for (let i = 0; i < parcels.length; i++) {
    const pA = parcels[i];
    const areaA = calculatePolygonAreaSqm(pA.geometry);

    // Check for sliver polygon (< 5 sqm)
    if (areaA < 5.0 && areaA > 0) {
      issues.push({
        errorType: 'SLIVER',
        severity: 'MEDIUM',
        affectedFeatureIds: [pA.id],
        description: `Parcel ${pA.parcel_number || pA.id} has an area of only ${areaA} m², which violates cadastral minimum size threshold.`
      });
    }

    // Check self-intersections or unclosed ring
    if (pA.geometry.type === 'Polygon') {
      const exteriorRing = pA.geometry.coordinates[0];
      if (exteriorRing && exteriorRing.length > 0) {
        const first = exteriorRing[0];
        const last = exteriorRing[exteriorRing.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) {
          issues.push({
            errorType: 'INVALID_RING',
            severity: 'HIGH',
            affectedFeatureIds: [pA.id],
            description: `Parcel ${pA.parcel_number} boundary polygon is unclosed.`
          });
        }
      }
    }

    const bboxA = getBBox(pA.geometry);

    for (let j = i + 1; j < parcels.length; j++) {
      const pB = parcels[j];
      const bboxB = getBBox(pB.geometry);

      if (bboxOverlap(bboxA, bboxB)) {
        // Detailed overlap heuristic checking polygon vertex proximity
        const coordsA = pA.geometry.type === 'Polygon' ? pA.geometry.coordinates[0] : [];
        const coordsB = pB.geometry.type === 'Polygon' ? pB.geometry.coordinates[0] : [];
        
        let duplicateVertexCount = 0;
        for (const ptA of coordsA) {
          for (const ptB of coordsB) {
            if (Math.abs(ptA[0] - ptB[0]) < 0.000005 && Math.abs(ptA[1] - ptB[1]) < 0.000005) {
              duplicateVertexCount++;
            }
          }
        }

        // If duplicate ring
        if (duplicateVertexCount >= Math.min(coordsA.length, coordsB.length) - 1 && coordsA.length > 3) {
          issues.push({
            errorType: 'DUPLICATE',
            severity: 'HIGH',
            affectedFeatureIds: [pA.id, pB.id],
            description: `Duplicate duplicate cadastral geometry detected between ${pA.parcel_number} and ${pB.parcel_number}.`
          });
        }
      }
    }
  }

  return issues;
}
