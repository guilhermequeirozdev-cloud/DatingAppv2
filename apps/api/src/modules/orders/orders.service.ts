import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EscrowStatus, OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  list(filters?: { sellerId?: string; buyerId?: string }) {
    return this.prisma.order.findMany({
      where: {
        sellerId: filters?.sellerId,
        buyerId: filters?.buyerId,
      },
      include: { watch: true, buyer: true, seller: true },
    }).then((orders) => orders.map((order) => this.mapOrder(order)));
  }

  get(id: string) {
    return this.prisma.order
      .findUnique({ where: { id }, include: { watch: true, buyer: true, seller: true, disputes: true } })
      .then((order) => (order ? this.mapOrder(order) : null));
  }

  create(data: { buyerId: string; sellerId: string; watchId: string }) {
    return this.prisma.order.create({
      data: {
        ...data,
        status: OrderStatus.PENDING,
        escrowStatus: EscrowStatus.NONE,
      },
    });
  }

  confirmDelivery(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.COMPLETED,
        escrowStatus: EscrowStatus.RELEASED,
      },
    });
  }

  createDispute(orderId: string, data: { reason: string; comment?: string }) {
    return this.prisma.dispute.create({
      data: {
        orderId,
        reason: data.reason,
        comment: data.comment,
        status: 'OPEN',
      },
    });
  }

  private mapOrder(order: { watch?: { images: string } }) {
    return {
      ...order,
      watch: order.watch
        ? {
            ...order.watch,
            images: order.watch.images.split(',').map((item) => item.trim()),
          }
        : undefined,
    };
  }
}
