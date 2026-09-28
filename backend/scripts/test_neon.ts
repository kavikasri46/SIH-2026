import { Client } from 'pg';

const connectionString = 'postgresql://neondb_owner:npg_aG1JoOR6utPE@ep-morning-water-b4e7ryr9-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function testConnection() {
  console.log('Connecting to Neon PostgreSQL database...');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Successfully connected to Neon PostgreSQL!');

    const res = await client.query('SELECT version();');
    console.log('PostgreSQL Version:', res.rows[0].version);

    // Check PostGIS
    try {
      await client.query('CREATE EXTENSION IF NOT EXISTS postgis;');
      const postgisRes = await client.query('SELECT PostGIS_Version();');
      console.log('✅ PostGIS Version:', postgisRes.rows[0].postgis_version);
    } catch (e: any) {
      console.log('PostGIS extension check:', e.message);
    }

    await client.end();
  } catch (err: any) {
    console.error('❌ Connection error:', err.message);
  }
}

testConnection();
