import type { Domain, DomainStats } from './types';

export interface APIResponse {
  domains: Domain[];
  stats: DomainStats;
}

const API_BASE_URL = '';

export async function fetchDomains(): Promise<APIResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/domains`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch domains:', error);
    throw error;
  }
}

export async function verifyDomains(): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/verify`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to verify domains:', error);
    throw error;
  }
}