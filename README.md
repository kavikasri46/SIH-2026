# SIH26012: AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System

[![Geospatial Standards: OGC Compliant](https://img.shields.io/badge/OGC-GeoJSON%20%7C%20WGS84-blue)](https://opengeospatial.org)
[![Deep Learning: PyTorch](https://img.shields.io/badge/PyTorch-2.2+-ee4c2c)](https://pytorch.org)
[![WebGIS: MapLibre GL](https://img.shields.io/badge/WebGIS-MapLibre%20GL-3b82f6)](https://maplibre.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-grade, multidisciplinary geospatial platform designed for **Smart India Hackathon (SIH26012)** to process high-resolution UAV drone orthomosaics, execute deep learning semantic segmentation, infer candidate cadastral parcel boundaries, validate GIS spatial topology, and support licensed surveyor and field officer ground-truthing workflows.

---

## 🏛️ Core System Architecture

```text
                     UAV Drone Orthomosaic (GeoTIFF / 5cm GSD)
                                     │
                                     ▼
                            Raster Preprocessor
                                     │
                                     ▼
                        Image Tiling (512x512 Window)
                                     │
                                     ▼
                    ┌─────────────────────────────────┐
                    │ Deep Learning Segmentation      │
                    │ (SegFormer-B0 / ResNet34-UNet)  │
                    └────────────────┬────────────────┘
                                     │
             ┌───────────────────────┼───────────────────────┐
             ▼                       ▼                       ▼
    Building Extraction       Road Extraction       Land Use Classification
    (Connected Components)   (Centerline/Corridor)   (Observed Zoning)
             │                       │                       │
             ▼                       ▼                       ▼
        Polygonize              Polygonize              Polygonize
             │                       │                       │
             └───────────────────────┼───────────────────────┘
                                     ▼
                     Candidate Parcel Inference Engine
                    (Building Hulls + Road Clearances)
                                     │
                                     ▼
                        GIS Topology Validation Engine
                        (ST_Overlaps / Slivers / Gaps)
                                     │
                         ┌───────────┴───────────┐
                         ▼                       ▼
                  Valid Boundaries        Topology Issues
                         │                       │
                         └───────────┬───────────┘
                                     ▼
                           Professional WebGIS Map
                                     │
                                     ▼
                          Surveyor Review & Edit
                                     │
                                     ▼
                         Field Ground-Truthing
                                     │
                                     ▼
                      Legally Certified Cadastral Export
```

---

## 🔒 Integrity Standard: Zero Simulated AI

In strict accordance with legal cadastral integrity guidelines:
* **No hardcoded confidence scores (`Math.random()` or fake 92%).**
* **No fake generated polygons without model provenance.**
* When PyTorch weights are not present on disk, the system explicitly reports **`MODEL_NOT_AVAILABLE`** with actionable setup instructions.
* Every geospatial feature includes an immutable provenance record:
  $$\text{Feature} \to \text{Status} \in \{\text{AI\_GENERATED}, \text{HUMAN\_EDITED}, \text{FIELD\_VERIFIED}, \text{APPROVED}\}$$

---

## 🚀 Quick Start Guide

### 1. Launch Backend Gateway
```powershell
cd backend
npm install
npm run dev
```
*API Base:* `http://localhost:5000/api`  
*Health Check:* `http://localhost:5000/health`

### 2. Launch WebGIS Frontend
```powershell
cd frontend
npm install
npm run dev
```
*Web Application:* `http://localhost:5173`

### 3. Launch Python AI Microservice (Optional / When Training)
```powershell
cd ai-service
pip install -r requirements.txt
python main.py
```

---

## 👥 Default Role-Based Access Control (RBAC) Accounts

All demo accounts have password: `Password@123`

| Role | Email | Permissions |
| :--- | :--- | :--- |
| **Admin** | `admin@cadastral.gov.in` | Full System Management, User Audits, Model Registry |
| **Senior Surveyor** | `surveyor@cadastral.gov.in` | Parcel Geometry Editing, Approval / Rejection, AI Runs |
| **GIS Analyst** | `analyst@cadastral.gov.in` | Topology Validation, Spatial Exports, Layer Analysis |
| **Field Officer** | `field@cadastral.gov.in` | Mobile dGPS Ground-Truthing, Beacon Consensus, Notes |
| **Public Viewer** | `viewer@cadastral.gov.in` | Read-only WebGIS Viewer & Public Land Records |

---

## 📄 Certified Cadastral Export & Reporting
* **GeoJSON:** Complete WGS84 vector layers formatted for QGIS / ArcGIS import.
* **PDF Report:** Official Government Cadastral Survey Summary with planar geodesic metrics, building footprints, road networks, and verification sign-offs.
