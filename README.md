# 京都さんぽ — 清水寺

Web制作基礎・Web制作実習で使う、非公式の授業用見本です。

## ページ

- `public/index.html` — 授業の入口
- `public/basic/index.html` — HTML/CSSのみ。スクリプトを読み込みません。
- `public/practice/index.html` — 同じ内容にJavaScriptの小さな操作を追加
- `public/compare/index.html` — HTMLの内容変更とCSSの色・間隔を比べる見本
- `public/credits.html` — 写真の著者、ライセンス、情報源

基本版と実習版は、それぞれホーム・見どころ・行く前にの3ページです。
実習版には、文章の表示切替、文字拡大、写真切替、分類、関心のある場所の保存、
チェック数、クイズ、短いメモがあります。保存するのは現在のブラウザーの場所選択のみです。

## ローカルで開く

`public/index.html` をブラウザーで開けます。実習版のブラウザー保存を試す場合は、
ローカルHTTPサーバーを使用します。

## ビルドとVercel

Node.js 22以上で `node scripts/build.mjs` を実行すると、`dist/` ができます。
依存パッケージのインストールは不要です。Vercelの設定は `vercel.json` に含まれます。
Framework: Other / Build command: `node scripts/build.mjs` / Output directory: `dist`。

写真4点は `public/assets/photos/` に保存済みです。ビルド時に外部サイトへ接続しません。
`assets-manifest.json` と `docs/photo-checksums.json` に出典と照合情報があります。
写真は各写真のCC BY-SAライセンスに従って利用してください。

## 授業での使い方

第1回は完成見本を観察し、WebのしくみとHTML/CSSの役割を確認します。
コードの書き方は第2回から扱います。JS版はWeb制作実習で使用します。
実習15回の計画は `docs/` にあります。完成見本の全コードを一度に写す必要はありません。

## 更新・運用

デザイン方針は `design.md`。既存のHTMLルートを維持し、CSSと文章を直接編集します。
GitHubのmainをVercelプロジェクト `web-sakuse-temple` に接続して公開します。
公開URLと今回の復旧結果は `docs/deployment-report.md` に記録します。
