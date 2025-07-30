import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from '../routes/+page.svelte';

describe('ドメイン一覧ページ', () => {
	it('ページタイトル「ドメイン一覧」が表示される', () => {
		render(Page);
		expect(screen.getByText('ドメイン一覧')).toBeInTheDocument();
	});

	it('サブタイトル「登録済みドメインの詳細を確認できます」が表示される', () => {
		render(Page);
		expect(screen.getByText('登録済みドメインの詳細を確認できます')).toBeInTheDocument();
	});

	it('統計情報が表示される', () => {
		render(Page);
		expect(screen.getByText('登録済み数')).toBeInTheDocument();
		expect(screen.getByText('認証済み')).toBeInTheDocument();
		expect(screen.getByText('7')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
	});

	it('検索入力フィールドが表示される', () => {
		render(Page);
		expect(screen.getByPlaceholderText('ドメインを検索')).toBeInTheDocument();
	});

	it('すべてのテスターラベルボタンが表示される', () => {
		render(Page);
		expect(screen.getByText('すべてのテスター')).toBeInTheDocument();
	});

	it('ドメインリストが表示される', () => {
		render(Page);
		expect(screen.getByText('2in3.cc')).toBeInTheDocument();
		expect(screen.getByText('example-corp.com')).toBeInTheDocument();
		expect(screen.getByText('secure-business.net')).toBeInTheDocument();
		expect(screen.getByText('failed-domain.org')).toBeInTheDocument();
		expect(screen.getByText('startup-tech.io')).toBeInTheDocument();
		expect(screen.getByText('portfolio-site.dev')).toBeInTheDocument();
		expect(screen.getByText('broken-example.com')).toBeInTheDocument();
	});

	it('認証済みドメインには緑色の認証済みバッジが表示される', () => {
		render(Page);
		const verifiedBadges = screen.getAllByText('認証済み');
		expect(verifiedBadges).toHaveLength(5);
	});

	it('認証失敗ドメインには赤色の認証失敗バッジが表示される', () => {
		render(Page);
		const failedBadges = screen.getAllByText('認証失敗');
		expect(failedBadges).toHaveLength(2);
	});

	it('TLD情報セクションが表示される', () => {
		render(Page);
		expect(screen.getByText('トップレベルドメイン（TLD）について')).toBeInTheDocument();
	});

	it('各TLDの説明が表示される', () => {
		render(Page);
		expect(screen.getByText('Cocos (Keeling) Islands')).toBeInTheDocument();
		expect(screen.getByText('Commercial')).toBeInTheDocument();
		expect(screen.getByText('Network')).toBeInTheDocument();
		expect(screen.getByText('Organization')).toBeInTheDocument();
		expect(screen.getByText('British Indian Ocean Territory')).toBeInTheDocument();
		expect(screen.getByText('Developer')).toBeInTheDocument();
	});
});