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

## Fluxos de demo

### Simular Pix
1. Abra um relógio e clique em **Comprar agora** para criar o pedido.
2. Na tela `/checkout/[orderId]`, clique em **Simular pagamento Pix**.
3. O pedido é atualizado para `PAID` e o escrow passa para `HOLDING`.

### Simular envio (Correios mock)
1. Entre no dashboard do seller (`/dashboard/seller`).
2. Clique em **Gerar envio** para criar o código de rastreio.
3. No pedido (`/orders/[id]`), clique em **Atualizar tracking** para ver status simulados.

### Disputa
1. No pedido (`/orders/[id]`), informe o motivo e clique em **Enviar disputa**.
2. No painel admin (`/dashboard/admin/disputes`), selecione **Liberar** ou **Reembolsar**.

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
