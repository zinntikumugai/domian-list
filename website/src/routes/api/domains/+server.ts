import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { domainsData } from '$lib/server/domains-data';
import { verifyAllDomains } from '$lib/server/dns-verifier';
import type { WebUIDomain, WebUIResponse } from '$lib/server/types';

export const GET: RequestHandler = async () => {
  try {
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

    return json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error('Failed to fetch domains:', error);
    return json(
      { error: 'Failed to fetch domains' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  }
};

export const OPTIONS: RequestHandler = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};