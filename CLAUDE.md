# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

所有ドメインを署名する為のシステム。SvelteKitで統合されたWebUIとAPIを提供する。

## 開発コマンド

```bash
npm run dev     # 開発サーバー起動 (localhost:5173)
npm run build   # プロダクションビルド
npm run preview # ビルド結果をプレビュー
npm run check   # TypeScript型チェック
npm run test    # テスト実行

# Cloudflareデプロイ
npm run deploy:cf         # Cloudflare Pagesにデプロイ
npm run deploy:cf-workers # Cloudflare Workersにデプロイ
```

## アーキテクチャ

### プロジェクト構造
- `/src/routes/` - SvelteKitページとAPIルート
  - `/api/domains` - ドメイン一覧取得とDNS検証
  - `/api/verify` - ドメイン検証状態確認
- `/src/lib/` - コンポーネントとユーティリティ
  - `/server/` - サーバーサイド機能（DNS検証等）
- `/domains.json` - ドメインデータと検証用TXTレコード

### ドメイン検証フロー
1. `domains.json`に所有ドメインと検証用TXTレコードを記録
2. DNS登録は手動で実施 (TXTレコード: `v=SelfDomain1; p=XXXXX...`)
3. SvelteKit APIが検証状態を確認してWebUIに表示

### 重要な設定ファイル
- `vite.config.ts` - Vite設定 (Node.js互換性有効)
- `tailwind.config.js` - ダークモード設定 (`darkMode: 'class'`)
- `svelte.config.js` - SvelteKit設定

## 注意事項

- domains.jsonは実際のドメイン情報を含むため注意して管理
- Webサーバーはすでに起動しています。再起動はユーザーに指示してください。
- MCPを使いスクリーンショットを撮って確認してください。