import type { Domain, DomainStats, TLDInfo } from './types';

export const mockDomains: Domain[] = [
	{
		name: '2in3.cc',
		description: '個人のウェブサイトおよびプロジェクト情報の公開に使用しているプロバイドサイト',
		verified: true,
		lastUpdated: '2024年1月15日 14:30'
	},
	{
		name: 'example-corp.com',
		description: '会社のウェブサイトその他各アプリケーションを格納するためのベース配信サイト',
		verified: true,
		lastUpdated: '2024年1月14日 16:45'
	},
	{
		name: 'secure-business.net',
		description: 'セキュリティ関連業務を行うブロックチェーンプラットフォーム提供会社のビジネス関連サイト',
		verified: true,
		lastUpdated: '2024年1月15日 11:20'
	},
	{
		name: 'failed-domain.org',
		description: '技術的な実装状況の改善ファイル集約先・不完了',
		verified: false,
		lastUpdated: '2024年1月13日 09:15'
	},
	{
		name: 'startup-tech.io',
		description: 'テクノロジースタートアップ事業およびサーバーとの通信のためのベースサイト',
		verified: true,
		lastUpdated: '2024年1月15日 12:10'
	},
	{
		name: 'portfolio-site.dev',
		description: 'ソフトウェア開発者の成果品および技術ブログやナナメント系のポートフォリオサイト',
		verified: true,
		lastUpdated: '2024年1月14日 18:00'
	},
	{
		name: 'broken-example.com',
		description: '開発テスト環境として利用中のテストサイト',
		verified: false,
		lastUpdated: '2024年1月12日 11:20'
	}
];

export const mockStats: DomainStats = {
	total: 7,
	verified: 5
};

export const mockTLDInfo: TLDInfo[] = [
	{
		extension: '.cc',
		type: 'Cocos (Keeling) Islands',
		description: 'ココス諸島の国別コードトップレベルドメイン、クリエイティブプロジェクトやクールなサイトに使用されています。'
	},
	{
		extension: '.com',
		type: 'Commercial',
		description: '最も一般的なトップレベルドメイン、商用サイトに主に利用されています。現在は用途が多様化して利用されています。'
	},
	{
		extension: '.net',
		type: 'Network',
		description: 'ネットワーク関連事業向けに作られたトップレベルドメイン、現在は用途に関わらず多く利用されています。'
	},
	{
		extension: '.org',
		type: 'Organization',
		description: '非営利組織向けに作られたトップレベルドメイン、現在は組織でなくとも利用されています。'
	},
	{
		extension: '.io',
		type: 'British Indian Ocean Territory',
		description: '英領インド洋地域の国別コードトップレベルドメイン、テック系スタートアップに人気の拡張子です。'
	},
	{
		extension: '.dev',
		type: 'Developer',
		description: '開発者向けのトップレベルドメイン、HTTPSが必須で、開発者やテック企業に多く利用されています。'
	}
];