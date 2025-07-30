import { DomainRecord, DomainVerificationStatus } from './types';

const DNS_OVER_HTTPS_URL = 'https://cloudflare-dns.com/dns-query';

export async function verifyDomain(domain: DomainRecord): Promise<DomainVerificationStatus> {
  try {
    const url = new URL(DNS_OVER_HTTPS_URL);
    url.searchParams.set('name', domain.name);
    url.searchParams.set('type', 'TXT');
    
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/dns-json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`DNS query failed: ${response.status}`);
    }
    
    const data = await response.json();
    const txtRecords = data.Answer?.filter((record: any) => record.type === 16) || [];
    
    // Extract the TXT record values and clean them
    const actualRecords = txtRecords.map((record: any) => {
      // Remove quotes from the data field
      return record.data.replace(/^"|"$/g, '');
    });
    
    // Check if expected record exists in actual records
    const expectedRecord = domain.txt_record.record;
    const verified = actualRecords.includes(expectedRecord);
    
    return {
      name: domain.name,
      verified,
      expectedRecord,
      actualRecord: actualRecords.find(r => r === expectedRecord) || actualRecords[0]
    };
  } catch (error) {
    console.error(`Error verifying domain ${domain.name}:`, error);
    return {
      name: domain.name,
      verified: false,
      expectedRecord: domain.txt_record.record,
      actualRecord: undefined
    };
  }
}

export async function verifyAllDomains(domains: DomainRecord[]): Promise<DomainVerificationStatus[]> {
  return Promise.all(domains.map(domain => verifyDomain(domain)));
}