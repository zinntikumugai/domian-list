import { describe, it, expect } from 'vitest';
import { GET } from './+server.js';

describe('GET /api/domains', () => {
  it('should return domain list with WebUI format', async () => {
    // Mock Request object
    const request = new Request('http://localhost/api/domains');
    
    const response = await GET({ request, params: {}, url: new URL(request.url) });
    
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('domains');
    expect(data).toHaveProperty('stats');
    expect(Array.isArray(data.domains)).toBe(true);
    
    if (data.domains.length > 0) {
      const domain = data.domains[0];
      expect(domain).toHaveProperty('name');
      expect(domain).toHaveProperty('description');
      expect(domain).toHaveProperty('verified');
      expect(domain).toHaveProperty('lastUpdated');
      expect(typeof domain.verified).toBe('boolean');
    }
    
    // Check stats structure
    expect(data.stats).toHaveProperty('total');
    expect(data.stats).toHaveProperty('verified');
    expect(typeof data.stats.total).toBe('number');
    expect(typeof data.stats.verified).toBe('number');
  });
});