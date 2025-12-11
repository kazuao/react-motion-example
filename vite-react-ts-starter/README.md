# React + TypeScript + Vite + Tailwind CSS v4 Boilerplate

これは、モダンなフロントエンド開発のための最強のスターターテンプレートです。

## 🚀 特徴
* **Core:** React 19 + TypeScript + Vite
* **Style:** Tailwind CSS v4 + `cn` utility (clsx + tailwind-merge)
* **Lint:** ESLint (Flat Config) + Prettier + Husky
* **Config:** VS Code Settings + Path Alias (`@/`)

## 📦 セットアップ

```bash
# 1. 依存関係のインストール
pnpm install

# 2. Gitフックの有効化 (必須)
git init
pnpm prepare

# 3. 開発サーバー起動
pnpm dev
```

## 🛠️ 便利な機能
- **`src/lib/utils.ts`**: Tailwindクラスの競合を解決する `cn` 関数が含まれています。
- **VS Code設定**: 保存時に自動整形が走る設定が含まれています。
