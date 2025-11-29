# Study-RPG

学習時間を“RPG の成長”として可視化し、勉強のモチベーションを高める学習管理アプリ。

**URL:** https://study-rpg.vercel.app/

---

## Overview

Study-RPG は、勉強時間に応じてコイン・経験値などの報酬を獲得し、  
キャラクターの強化やゲーム進行につながる仕組みを備えた学習モチベーション支援アプリである。

- 想定ユーザー  
  - 勉強を頑張りたい人  
  - 自分の勉強時間を可視化したい人  
- 概要  
  - 勉強時間に応じてコイン・経験値を獲得し、プレイヤーの成長に反映される  
  - 成長したステータスを活かして冒険・戦闘を有利に進行できる

---

## Features

- 勉強時間の計測・記録  
- 勉強記録の振り返り（週 / 月）  
- 装備購入・管理  
- アイテム購入  
- マップ探索（冒険）  
- モンスターとのターン制バトル  
- ドロップアイテムの取得  
- アイテムクラフト  
- ギルド作成・加入

---

## Screenshots

### Home
<img src="..." width="600" />

### Map
<img src="..." width="600" />

### Battle
<img src="..." width="600" />

### Craft
<img src="..." width="600" />


## Tech Stack

### Framework / Runtime
- Next.js 15（App Router / Server Actions）
- React 19
- TypeScript
- Node.js 20

### Backend / DB
- Prisma ORM  
- PostgreSQL（Neon）  
- NextAuth（Google / Email / Credentials / Guest Login）

### Frontend / UI
- Tailwind CSS 4  
- Radix UI  
- Lucide Icons  
- react-hook-form  
- pixi.js

### Validation
- Zod

### Utilities
- date-fns  
- clsx  
- class-variance-authority  
- motion  
- nodemailer

### Dev / Build
- Turbopack  
- ESLint / TypeScript

### CI/CD
- GitHub Actions（Lint / Build）  
- Deploy: **Vercel**

---

## GitHub Actions (CI)

```yaml
name: Next.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build


## Directory Structure

tensho1026-study-rpg/
├── README.md
├── next.config.ts
├── package.json
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── Seeders/
├── src/
│   ├── app/                  # App Router / Server Actions
│   │   ├── actions/          # 各種 server actions
│   │   ├── battle/[id]/page.tsx
│   │   ├── map/[id]/page.tsx
│   │   ├── craft/page.tsx
│   │   ├── home/page.tsx
│   │   └── auth/...
│   ├── components/           # Presentational Components
│   ├── domain/               # 純粋ロジック(Domain Layer)
│   ├── hooks/                # Application Layer (battle engine など)
│   ├── lib/                  # Repository 層 / DB アクセス
│   ├── constant/             # マスターデータ
│   ├── providers/
│   ├── types/
│   └── utils/
└── .github/
    └── workflows/main.yml
