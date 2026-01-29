import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EscrowStatus, OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.order.findMany({ include: { watch: true, buyer: true, seller: true } });
  }

  get(id: string) {
    return this.prisma.order.findUnique({ where: { id }, include: { watch: true, buyer: true, seller: true, disputes: true } });
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
}
