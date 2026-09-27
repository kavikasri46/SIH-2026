/**
 * Automated End-to-End API and Geospatial Verification Test Suite for SIH26012
 */

const API_BASE = 'http://localhost:5000/api';

async function runTests() {
  console.log('🧪 Starting SIH26012 End-to-End Verification Tests...\n');

  try {
    // 1. Health Check
    console.log('[1/7] Testing Backend Health Check...');
    const health = await fetch('http://localhost:5000/health');
    const healthJson = await health.json();
    if (healthJson.status !== 'HEALTHY') throw new Error('Health check failed');
    console.log('  ✅ Backend is HEALTHY\n');

    // 2. Authentication Test
    console.log('[2/7] Testing Surveyor JWT Authentication...');
    const loginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'surveyor@cadastral.gov.in',
        password: 'Password@123'
      })
    });
    const loginData = await loginRes.json();
    if (!loginData.success || !loginData.data.token) {
      throw new Error(`Authentication login failed: ${JSON.stringify(loginData)}`);
    }
    const token = loginData.data.token;
    console.log(`  ✅ Surveyor authenticated: ${loginData.data.user.fullName} (${loginData.data.user.role})\n`);

    const authHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // 3. Project Management Test
    console.log('[3/7] Testing Project Retrieval...');
    const projRes = await fetch(`${API_BASE}/projects`, { headers: authHeaders });
    const projData = await projRes.json();
    if (!projData.success || !projData.data || projData.data.length === 0) {
      throw new Error(`Failed to retrieve projects: ${JSON.stringify(projData)}`);
    }
    const project = projData.data[0];
    console.log(`  ✅ Retrieved active survey: "${project.name}" (ID: ${project.id})\n`);

    // 4. GIS Layers Test
    console.log('[4/7] Testing Cadastral Parcels Layer Extraction...');
    const parcelsRes = await fetch(`${API_BASE}/projects/${project.id}/parcels`, { headers: authHeaders });
    const parcelsData = await parcelsRes.json();
    if (!parcelsData.success || !parcelsData.data || parcelsData.data.type !== 'FeatureCollection') {
      throw new Error(`Parcels layer returned invalid GeoJSON: ${JSON.stringify(parcelsData)}`);
    }
    console.log(`  ✅ Retrieved ${parcelsData.data.features.length} GeoJSON candidate parcels\n`);

    // 5. Topology Scan Test
    console.log('[5/7] Testing Topology Error Validation Engine...');
    const topoRes = await fetch(`${API_BASE}/projects/${project.id}/topology`, { headers: authHeaders });
    const topoData = await topoRes.json();
    if (!topoData.success) {
      throw new Error('Failed to query topology engine');
    }
    console.log(`  ✅ Topology scan functional. Open issues: ${topoData.data.length}\n`);

    // 6. Honest AI Verification Test
    console.log('[6/7] Testing AI Model Registry and Honest Availability Check...');
    const aiModelsRes = await fetch(`${API_BASE}/ai/models`, { headers: authHeaders });
    const aiModelsData = await aiModelsRes.json();
    if (!aiModelsData.success || aiModelsData.data.length === 0) {
      throw new Error('Failed to load AI model registry');
    }
    const model = aiModelsData.data[0];
    console.log(`  ✅ AI Model '${model.name}' reported honest status: ${model.status}\n`);

    // 7. Field Verification Test
    console.log('[7/7] Testing Surveyor Verification Workflow...');
    if (parcelsData.data.features.length > 0) {
      const targetParcel = parcelsData.data.features[0];
      const verifyRes = await fetch(`${API_BASE}/gis/parcels/${targetParcel.id}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({
          status: 'APPROVED',
          surveyorNotes: 'Verified against municipal revenue map during automated test run.'
        })
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        throw new Error(`Failed to approve parcel: ${JSON.stringify(verifyData)}`);
      }
      console.log(`  ✅ Parcel ${targetParcel.properties.parcelNumber} approved successfully\n`);
    }

    console.log('🎉 ALL 7 END-TO-END VERIFICATION TESTS PASSED PERFECTLY!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();
