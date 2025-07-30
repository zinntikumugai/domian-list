# Domain List

所有ドメインを署名する為のシステム。SvelteKitでWebUIを表示し、内蔵APIでドメイン検証を行います。

## セットアップ

```bash
npm install
```

## 開発

```bash
npm run dev     # 開発サーバー起動 (localhost:5173)
```

## ビルド・デプロイ

```bash
npm run build   # プロダクションビルド
npm run preview # ビルド結果をプレビュー

# Cloudflareデプロイ
npm run deploy:cf         # Cloudflare Pagesにデプロイ
npm run deploy:cf-workers # Cloudflare Workersにデプロイ
```

### Cloudflareデプロイ手順

#### 手動デプロイ
1. **Wrangler認証**
   ```bash
   npx wrangler login
   ```

2. **デプロイ**
   ```bash
   npm run deploy:cf-workers  # フルスタックアプリとしてWorkers環境にデプロイ
   ```

#### GitHub Actions自動デプロイ
1. **GitHub Secrets設定**
   - `CLOUDFLARE_API_TOKEN`: Cloudflare APIトークン
   - `CLOUDFLARE_ACCOUNT_ID`: CloudflareアカウントID

2. **GitHub Variables設定**
   - `DOMAINS_JSON`: domains.jsonの内容（JSON形式）

3. **自動デプロイ**
   - mainブランチへのpushで自動デプロイ
   - 手動実行も可能（workflow_dispatch）

## domains.json 形式

```json
{
    "domains": [
        {
            "name": "example.com",
            "url": "https://example.com/",
            "description": "ほげほげほげほげ",
            "txt_record": {
                "name": "example.com",
                "record": "v=SelfDomain1; p=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            }
        }
    ]
}
```

## DNS設定

各ドメインには、domains.jsonで指定されたTXTレコードを設定してください：

```
TXT レコード: v=SelfDomain1; p=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## アーキテクチャ

- **フロントエンド**: SvelteKit (Tailwind CSS, ダークモード対応)
- **API**: SvelteKitの内蔵APIルート
  - `/api/domains` - ドメイン一覧取得とDNS検証
  - `/api/verify` - ドメイン検証状態確認
- **DNS検証**: Cloudflare DNS over HTTPSでリアルタイム検証

## 機能

- ドメイン一覧表示
- リアルタイムDNS検証
- ステータスフィルタリング
- TLD情報表示（ccTLD/gTLD分類付き）
- レスポンシブデザイン