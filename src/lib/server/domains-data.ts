import { DomainsData } from './types';
import domainsJson from '../../../domains.json';

// domains.jsonの内容を読み込み
export const domainsData: DomainsData = domainsJson as DomainsData;