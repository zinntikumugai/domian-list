import { sampleDomainsData } from './domains-data';
import { verifyAllDomains } from './dns-verifier';

export interface Env {
  // KV namespace binding
  // DOMAINS_KV: KVNamespace;
  
  // D1 Database binding
  // DB: D1Database;
  
  // Environment variables
  ENVIRONMENT: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }
    
    // Route handling
    if (url.pathname === '/api/domains' && request.method === 'GET') {
      // Return the domain list from sample data
      return new Response(JSON.stringify({ domains: sampleDomainsData.domains }), { headers });
    }
    
    if (url.pathname === '/api/verify' && request.method === 'GET') {
      // Verify all domains
      const verificationResults = await verifyAllDomains(sampleDomainsData.domains);
      return new Response(JSON.stringify({ verified: verificationResults }), { headers });
    }
    
    // 404 for unknown routes
    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers,
    });
  },
};