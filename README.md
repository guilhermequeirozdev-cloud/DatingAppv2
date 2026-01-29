# Luxury Watch Marketplace (Demo)

Marketplace C2C de relógios de luxo com mocks para demo local. Nenhuma integração externa real é necessária.

## Stack
- Backend: NestJS + Prisma (SQLite em modo demo)
- Frontend: Next.js 14 (App Router) + Tailwind
- Shared: tipos/contratos em `packages/shared`

## Como rodar (demo)

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

> `npm run dev` inicia `apps/api` e `apps/web` em paralelo. Ajuste conforme seu ambiente.

## Credenciais demo

- Admin: `admin@luxwatch.com` / `admin123`
- Seller: `seller@luxwatch.com` / `seller123`
- Buyer: `buyer@luxwatch.com` / `buyer123`

## Endpoints mock principais

- POST `/payments/pix`
- POST `/payments/mock-confirm/:orderId`
- POST `/shipping/calculate`
- POST `/shipping/create`
- GET `/shipping/track/:code`
- POST `/orders/:id/confirm-delivery`
- POST `/admin/orders/:id/release`
- POST `/admin/orders/:id/refund`

## Observações
- IA de autenticação é mock com score alto (85-98).
- Pix e Correios são mocks.
- Upload de imagens usa pasta local `/uploads` (demo).
