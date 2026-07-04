# pulsakeren

Website PPOB full-stack berbasis Next.js App Router, TypeScript, Tailwind CSS, Prisma, dan PostgreSQL. Desain default menggunakan konsep dark futuristic untuk domain `pulsakeren.com`.

## Jalankan Lokal

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

Jika PostgreSQL sudah tersedia:

```bash
npm run db:push
npm run db:seed
```

## Akun Demo

Pelanggan: `user@pulsakeren.com` / `password123`

Admin: `admin@pulsakeren.com` / `password123`

## Route Utama

- `/` homepage dark futuristic.
- `/checkout` checkout dan payment sandbox.
- `/dashboard` dashboard user.
- `/admin/login` login admin.
- `/admin` Admin CMS.
- `/api/products`, `/api/orders`, `/api/auth/login` REST API mock.

## Deploy Hostinger Node.js

```bash
npm install
npm run build
npm run start
```

Isi environment dari `.env.example`, terutama `DATABASE_URL` jika memakai PostgreSQL.
