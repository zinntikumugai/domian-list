# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

所有ドメインを署名する為のシステム。Cloudflare WorkersでAPIを提供し、SvelteでWebUIを表示する。

## 開発コマンド

### Workers API
```bash
npm run dev:workers    # 開発サーバー起動
npm run build:workers  # Cloudflareへデプロイ
```

### Website (Svelte)
```bash
npm run dev:website    # 開発サーバー起動 (localhost:5173)
npm run build:website  # プロダクションビルド
cd website && npm run check  # TypeScript型チェック
```

## アーキテクチャ

### プロジェクト構造
- `/workers/` - Cloudflare Workers API
  - `/api/domains` - ドメイン一覧取得
  - `/api/verify` - ドメイン検証状態確認
- `/website/` - Svelte フロントエンド (Tailwind CSS, ダークモード対応)
- `/domains.json` - ドメインデータと検証用TXTレコード

### ドメイン検証フロー
1. `domains.json`に所有ドメインと検証用TXTレコードを記録
2. DNS登録は手動で実施 (TXTレコード: `v=SelfDomain1; p=XXXXX...`)
3. Workers APIが検証状態を確認してWebUIに表示

### 重要な設定ファイル
- `wrangler.toml` - Workers設定 (node_compat有効)
- `website/tailwind.config.js` - ダークモード設定 (`darkMode: 'class'`)

## 注意事項

- domains.jsonは.gitignoreに含まれている（実際のドメイン情報を含むため）
- Workers APIにはまだKV/D1バインディングが設定されていない（コメントアウト状態）
- Webサーバーはすでに起動しています。再起動はユーザーに指示してください。
- MCPを使いスクリーンショットを撮って確認してください。