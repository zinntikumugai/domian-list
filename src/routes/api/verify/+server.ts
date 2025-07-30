import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { domainsData } from '$lib/server/domains-data';
import { verifyAllDomains } from '$lib/server/dns-verifier';

export const GET: RequestHandler = async () => {
  try {
    // Verify all domains
    const verificationResults = await verifyAllDomains(domainsData.domains);
    
    return json(
      { verified: verificationResults },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  } catch (error) {
    console.error('Failed to verify domains:', error);
    return json(
      { error: 'Failed to verify domains' },
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