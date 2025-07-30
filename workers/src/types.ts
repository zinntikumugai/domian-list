export interface DomainRecord {
  name: string;
  url?: string;
  description?: string;
  verified?: boolean;
  lastUpdated?: string;
  txt_record: {
    name: string;
    record: string;
  };
}

export interface DomainsData {
  domains: DomainRecord[];
}

export interface DomainVerificationStatus {
  name: string;
  verified: boolean;
  expectedRecord: string;
  actualRecord?: string;
}

// WebUI用のドメイン形式
export interface WebUIDomain {
  name: string;
  description: string;
  verified: boolean;
  lastUpdated: string;
  url?: string;
}

export interface WebUIResponse {
  domains: WebUIDomain[];
  stats: {
    total: number;
    verified: number;
  };
}