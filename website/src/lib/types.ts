export interface Domain {
	name: string;
	description: string;
	verified: boolean;
	lastUpdated: string;
	url?: string;
}

export interface DomainStats {
	total: number;
	verified: number;
}

export interface TLDInfo {
	extension: string;
	type: string;
	description: string;
	category: 'ccTLD' | 'gTLD';
}