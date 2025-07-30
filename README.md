# domian-list

所有ドメインを署名する為のシステム

以下から構成する
- Webサイト: WebUIとして所有ドメインとその署名の確認を表示する。
    - Cloudflare Wokersを使用する。
    - TypeScript使用する。

## ロジック

1. 所有ドメインをJSONに記録する。
2. 各ドメインに検証用レコードを発行(値はJSONで記録)、DNS登録を依頼する(手動)
3. Webサイト閲覧時APIをコールして所有ドメイン一覧と確認済みを列挙する

## domain.json
ドメイン一覧と期待されるレコードの値を記録する。
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

## Webサイト
- ベース: SveltKitを用いる
- CSS: tailwindを用いる
- ダークモード：対応する