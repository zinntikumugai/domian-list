import { describe, it, expect } from 'vitest';
import worker from './index';

describe('Domain List API', () => {
  describe('GET /api/domains', () => {
    it('should return domain list', async () => {
      const request = new Request('http://localhost/api/domains');
      const env = { ENVIRONMENT: 'test' };
      const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
      
      const response = await worker.fetch(request, env, ctx);
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('application/json');
      
      const data = await response.json();
      expect(data).toHaveProperty('domains');
      expect(data).toHaveProperty('stats');
      expect(Array.isArray(data.domains)).toBe(true);
      expect(data.domains.length).toBeGreaterThan(0);
      
      // Check domain structure (WebUI format)
      const domain = data.domains[0];
      expect(domain).toHaveProperty('name');
      expect(domain).toHaveProperty('description');
      expect(domain).toHaveProperty('verified');
      expect(domain).toHaveProperty('lastUpdated');
      expect(typeof domain.verified).toBe('boolean');
      
      // Check stats structure
      expect(data.stats).toHaveProperty('total');
      expect(data.stats).toHaveProperty('verified');
      expect(typeof data.stats.total).toBe('number');
      expect(typeof data.stats.verified).toBe('number');
    });
    
    it('should include CORS headers', async () => {
      const request = new Request('http://localhost/api/domains');
      const env = { ENVIRONMENT: 'test' };
      const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
      
      const response = await worker.fetch(request, env, ctx);
      
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET, OPTIONS');
    });
  });
  
  describe('OPTIONS requests', () => {
    it('should handle preflight requests', async () => {
      const request = new Request('http://localhost/api/domains', {
        method: 'OPTIONS'
      });
      const env = { ENVIRONMENT: 'test' };
      const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
      
      const response = await worker.fetch(request, env, ctx);
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET, OPTIONS');
      expect(response.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type');
    });
  });
  
  describe('GET /api/verify', () => {
    it('should return verification status for all domains', async () => {
      const request = new Request('http://localhost/api/verify');
      const env = { ENVIRONMENT: 'test' };
      const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
      
      const response = await worker.fetch(request, env, ctx);
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('application/json');
      
      const data = await response.json();
      expect(data).toHaveProperty('verified');
      expect(Array.isArray(data.verified)).toBe(true);
      
      // Check verification structure
      if (data.verified.length > 0) {
        const verification = data.verified[0];
        expect(verification).toHaveProperty('name');
        expect(verification).toHaveProperty('verified');
        expect(verification).toHaveProperty('expectedRecord');
        expect(typeof verification.verified).toBe('boolean');
      }
    });
  });
  
  describe('404 handling', () => {
    it('should return 404 for unknown routes', async () => {
      const request = new Request('http://localhost/unknown');
      const env = { ENVIRONMENT: 'test' };
      const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
      
      const response = await worker.fetch(request, env, ctx);
      
      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(data.error).toBe('Not Found');
    });
  });
});