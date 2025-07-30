export interface DomainRecord {
  name: string;
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