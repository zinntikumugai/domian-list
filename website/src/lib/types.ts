export interface Domain {
	name: string;
	description: string;
	verified: boolean;
	lastUpdated: string;
}

export interface DomainStats {
	total: number;
	verified: number;
}

export interface TLDInfo {
	extension: string;
	type: string;
	description: string;
	example: string;
}