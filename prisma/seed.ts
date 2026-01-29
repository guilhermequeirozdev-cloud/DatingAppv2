import { PrismaClient, Role, WatchStatus, OrderStatus, EscrowStatus, DisputeStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@luxwatch.com',
      password: 'admin123',
      role: Role.ADMIN,
    },
  });

  const seller = await prisma.user.create({
    data: {
      name: 'Seller',
      email: 'seller@luxwatch.com',
      password: 'seller123',
      role: Role.SELLER,
    },
  });

  const buyer = await prisma.user.create({
    data: {
      name: 'Buyer',
      email: 'buyer@luxwatch.com',
      password: 'buyer123',
      role: Role.BUYER,
    },
  });

  const watches = await prisma.watch.createMany({
    data: [
      {
        brand: 'Rolex',
        model: 'Submariner',
        price: 52000,
        condition: 'Excelente',
        description: 'Clássico esportivo com acabamento impecável.',
        images: 'https://images.unsplash.com/photo-1518544801976-3e0f042f0c2f',
        status: WatchStatus.APPROVED,
        sellerId: seller.id,
      },
      {
        brand: 'Omega',
        model: 'Seamaster',
        price: 32000,
        condition: 'Muito bom',
        description: 'Modelo icônico para mergulho.',
        images: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3',
        status: WatchStatus.APPROVED,
        sellerId: seller.id,
      },
      {
        brand: 'Patek Philippe',
        model: 'Nautilus',
        price: 220000,
        condition: 'Colecionador',
        description: 'Referência desejada com histórico completo.',
        images: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        status: WatchStatus.APPROVED,
        sellerId: seller.id,
      },
      {
        brand: 'Audemars Piguet',
        model: 'Royal Oak',
        price: 180000,
        condition: 'Excelente',
        description: 'Luxo esportivo com caixa octogonal.',
        images: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24',
        status: WatchStatus.APPROVED,
        sellerId: seller.id,
      },
      {
        brand: 'Cartier',
        model: 'Santos',
        price: 45000,
        condition: 'Muito bom',
        description: 'Elegância clássica e pulseira integrada.',
        images: 'https://images.unsplash.com/photo-1524678714210-9917a6c619c0',
        status: WatchStatus.APPROVED,
        sellerId: seller.id,
      },
      {
        brand: 'TAG Heuer',
        model: 'Carrera',
        price: 24000,
        condition: 'Excelente',
        description: 'Cronógrafo esportivo sofisticado.',
        images: 'https://images.unsplash.com/photo-1518544801976-3e0f042f0c2f',
        status: WatchStatus.APPROVED,
        sellerId: seller.id,
      },
    ],
  });

  const watchList = await prisma.watch.findMany();

  const paidOrder = await prisma.order.create({
    data: {
      buyerId: buyer.id,
      sellerId: seller.id,
      watchId: watchList[0].id,
      status: OrderStatus.PAID,
      escrowStatus: EscrowStatus.HOLDING,
      trackingCode: 'BR123456789BR',
    },
  });

  await prisma.order.create({
    data: {
      buyerId: buyer.id,
      sellerId: seller.id,
      watchId: watchList[1].id,
      status: OrderStatus.COMPLETED,
      escrowStatus: EscrowStatus.RELEASED,
      trackingCode: 'BR987654321BR',
    },
  });

  await prisma.dispute.create({
    data: {
      orderId: paidOrder.id,
      reason: 'Dúvida sobre autenticidade',
      comment: 'Gostaria de verificar o número de série.',
      status: DisputeStatus.OPEN,
    },
  });

  await prisma.user.update({
    where: { id: admin.id },
    data: {},
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
