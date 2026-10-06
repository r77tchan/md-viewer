# md-viewer

Markdown ファイルをブラウザで閲覧するための、閲覧専用のアプリ。編集や内容の保存はしない。

- 手元の .md ファイルを開く（ファイル選択・ドラッグ＆ドロップ）
- GFM（表・チェックリストなど）、コードのシンタックスハイライト、ダークモード、目次
- DB・サーバーは持たず、GitHub Pages で公開する

公開 URL: https://r77tchan.github.io/md-viewer/

## 技術スタック

- Vite + React + TypeScript
- HeroUI v3 + Tailwind CSS v4
- Vitest（テスト）、ESLint
- npm

## 開発用コマンド

```sh
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# ビルド成果物のプレビュー
npm run preview

# テストの実行
npm test

# Lint の実行
npm run lint
```

## デプロイ

`main` ブランチに push すると、GitHub Actions がビルドして GitHub Pages に自動で公開する（`.github/workflows/deploy.yml`）。
