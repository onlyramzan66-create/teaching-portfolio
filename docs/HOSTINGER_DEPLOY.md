# Hostinger Deployment (Single Nest Server)

This project runs frontend and backend from one Nest process:
- Frontend static export served from `out/`
- Backend API served from `backend/dist/main.js`

## 1. Push These Files to GitHub

Include source and config templates:
- `src/`
- `public/`
- `backend/src/`
- `package.json`, `package-lock.json`
- `backend/package.json`, `backend/package-lock.json`
- `next.config.mjs`
- `ecosystem.config.js`
- `.env.local.example`
- `backend/.env.example`

Do not include:
- `.next/`, `out/`
- `node_modules/`, `backend/node_modules/`
- `backend/dist/`
- `.env.local`, `.env.local2`, `backend/.env`, `backend/.env.backend`

## 2. Server Setup

```bash
git clone https://github.com/muhammadramzan92/teaching_portfolio-.git
cd teaching_portfolio-
npm install
cd backend && npm install && cd ..
```

## 3. Create Production Env on Server

Create:
- `backend/.env.backend` (copy from `backend/.env.example` and fill real values)
- `.env.local` (copy from `.env.local.example`)

Use production URLs:
- `NEXT_PUBLIC_BACKEND_API_URL=https://www.gohar.online`
- `NEXT_PUBLIC_SITE_URL=https://www.gohar.online`

## 4. Build

```bash
# root (creates out/)
npm run build

# backend (creates backend/dist)
cd backend
npm run build
cd ..
```

## 5. Run with PM2

```bash
npm i -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 6. Update Deploy

```bash
git pull
npm install
cd backend && npm install && cd ..
npm run build
cd backend && npm run build && cd ..
pm2 restart goharonline
```
