import { describe, it, expect, vi, afterEach } from 'vitest';
import { verifyDomain, verifyAllDomains } from './dns-verifier';
import { DomainRecord } from './types';

// Mock the global fetch function
global.fetch = vi.fn();

describe('DNS Verifier', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  
  describe('verifyDomain', () => {
    it('should verify domain with matching TXT record', async () => {
      const domain: DomainRecord = {
        name: 'example.com',
        txt_record: {
          name: 'example.com',
          record: 'v=SelfDomain1; p=test123'
        }
      };
      
      // Mock DNS over HTTPS response
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          Answer: [
            {
              name: 'example.com.',
              type: 16, // TXT record
              data: '"v=SelfDomain1; p=test123"'
            }
          ]
        })
      });
      
      const result = await verifyDomain(domain);
      
      expect(result).toEqual({
        name: 'example.com',
        verified: true,
        expectedRecord: 'v=SelfDomain1; p=test123',
        actualRecord: 'v=SelfDomain1; p=test123'
      });
    });
    
    it('should fail verification with non-matching TXT record', async () => {
      const domain: DomainRecord = {
        name: 'example.com',
        txt_record: {
          name: 'example.com',
          record: 'v=SelfDomain1; p=test123'
        }
      };
      
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          Answer: [
            {
              name: 'example.com.',
              type: 16,
              data: '"v=SelfDomain1; p=wrong"'
            }
          ]
        })
      });
      
      const result = await verifyDomain(domain);
      
      expect(result).toEqual({
        name: 'example.com',
        verified: false,
        expectedRecord: 'v=SelfDomain1; p=test123',
        actualRecord: 'v=SelfDomain1; p=wrong'
      });
    });
    
    it('should fail verification when no TXT records found', async () => {
      const domain: DomainRecord = {
        name: 'example.com',
        txt_record: {
          name: 'example.com',
          record: 'v=SelfDomain1; p=test123'
        }
      };
      
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          Answer: []
        })
      });
      
      const result = await verifyDomain(domain);
      
      expect(result).toEqual({
        name: 'example.com',
        verified: false,
        expectedRecord: 'v=SelfDomain1; p=test123',
        actualRecord: undefined
      });
    });
    
    it('should handle DNS query errors gracefully', async () => {
      const domain: DomainRecord = {
        name: 'example.com',
        txt_record: {
          name: 'example.com',
          record: 'v=SelfDomain1; p=test123'
        }
      };
      
      (global.fetch as any).mockRejectedValueOnce(new Error('DNS query failed'));
      
      const result = await verifyDomain(domain);
      
      expect(result).toEqual({
        name: 'example.com',
        verified: false,
        expectedRecord: 'v=SelfDomain1; p=test123',
        actualRecord: undefined
      });
    });
  });
  
  describe('verifyAllDomains', () => {
    it('should verify all domains in parallel', async () => {
      const domains: DomainRecord[] = [
        {
          name: 'example.com',
          txt_record: {
            name: 'example.com',
            record: 'v=SelfDomain1; p=test123'
          }
        },
        {
          name: 'test.com',
          txt_record: {
            name: 'test.com',
            record: 'v=SelfDomain1; p=test456'
          }
        }
      ];
      
      // Mock responses for both domains
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            Answer: [
              {
                name: 'example.com.',
                type: 16,
                data: '"v=SelfDomain1; p=test123"'
              }
            ]
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            Answer: [
              {
                name: 'test.com.',
                type: 16,
                data: '"v=SelfDomain1; p=test456"'
              }
            ]
          })
        });
      
      const results = await verifyAllDomains(domains);
      
      expect(results).toHaveLength(2);
      expect(results[0]).toEqual({
        name: 'example.com',
        verified: true,
        expectedRecord: 'v=SelfDomain1; p=test123',
        actualRecord: 'v=SelfDomain1; p=test123'
      });
      expect(results[1]).toEqual({
        name: 'test.com',
        verified: true,
        expectedRecord: 'v=SelfDomain1; p=test456',
        actualRecord: 'v=SelfDomain1; p=test456'
      });
    });
  });
});