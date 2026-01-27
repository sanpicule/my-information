<img alt="Static Badge" src="https://img.shields.io/badge/Next.js-v.16.1.4-black?logo=next.js">
<img alt="Static Badge" src="https://img.shields.io/badge/React-v.18.2.0-blue?logo=react">
<img alt="Static Badge" src="https://img.shields.io/badge/FramerMotion-v.12.23.12-yellow?style=flat">
<img alt="Static Badge" src="https://img.shields.io/badge/TailwindCSS-v.3.3.6-informational?style=flat&logo=tailwindcss">






# HIKAWA SANSHIROのプロフィールサイト

Next.js、TypeScript、Tailwind CSSを使用して構築されたシンプルなプロフィールサイトです。

## 特徴

- **レスポンシブデザイン**: モバイル、タブレット、デスクトップに対応
- **モダンなUI/UX**: Tailwind CSSとFramer Motionを使用したシンプルなアニメーション
- **静的サイト生成**: Next.jsの静的エクスポート機能を使用
- **TypeScript**: 型安全性を確保
- **SEO最適化**: メタデータと構造化データに対応

## 技術スタック

- **フレームワーク**: Next.js
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **アイコン**: Lucide React

## セクション構成

1. **Hero**: ファーストビュー
2. **About**: 現在地、略歴
3. **Skills**: 技術スキル一覧
4. **portfolio**: 個人開発プロジェクト
5. **Contact**: お問い合わせフォームと連絡先情報

## セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 静的ファイルのエクスポート
npm run export
```

### 環境変数

現在、環境変数は不要です。必要に応じて`.env.local`ファイルを作成してください。

## カスタマイズ

### データの編集

`src/lib/data.ts`ファイルを編集して、以下の情報を更新してください：

- 個人情報（名前、肩書き、自己紹介）
- スキル情報
- プロジェクト情報
- 連絡先情報

### スタイルのカスタマイズ

`tailwind.config.js`でカラーテーマやフォントをカスタマイズできます。

### コンポーネントの修正

各セクションは`src/components/`ディレクトリ内の個別ファイルで管理されています。

## デプロイ

### Vercel（推奨）

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel
```

### その他の静的ホスティング

```bash
# 静的ファイルのビルド
npm run build
npm run export

# outディレクトリの内容をホスティングサービスにアップロード
```

### ファイル構造

```
src/
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ProjectDetail.tsx
│   ├── Skills.tsx
│   └── Portfolio.tsx
├── lib/
│   └── data.ts
└── types/
    └── index.ts
```
