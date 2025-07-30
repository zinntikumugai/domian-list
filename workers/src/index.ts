import { domainsData } from './domains-data';
import { verifyAllDomains } from './dns-verifier';
import { WebUIDomain, WebUIResponse } from './types';

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
      // DNS検証を実行
      const verificationResults = await verifyAllDomains(domainsData.domains);
      
      // Convert domains.json format to WebUI format with DNS verification results
      const webUIDomains: WebUIDomain[] = domainsData.domains.map(domain => {
        const verification = verificationResults.find(v => v.name === domain.name);
        return {
          name: domain.name,
          description: domain.description || '',
          verified: verification?.verified ?? false,
          lastUpdated: domain.lastUpdated || new Date().toLocaleDateString('ja-JP'),
          url: domain.url
        };
      });

      const stats = {
        total: webUIDomains.length,
        verified: webUIDomains.filter(d => d.verified).length
      };

      const response: WebUIResponse = {
        domains: webUIDomains,
        stats
      };

      return new Response(JSON.stringify(response), { headers });
    }
    
    if (url.pathname === '/api/verify' && request.method === 'GET') {
      // Verify all domains
      const verificationResults = await verifyAllDomains(domainsData.domains);
      return new Response(JSON.stringify({ verified: verificationResults }), { headers });
    }
    
    // 404 for unknown routes
    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers,
    });
  },
};