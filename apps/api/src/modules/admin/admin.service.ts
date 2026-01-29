import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EscrowStatus, OrderStatus, WatchStatus, DisputeStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  listPendingWatches() {
    return this.prisma.watch.findMany({ where: { status: WatchStatus.PENDING }, include: { seller: true } });
  }

  approveWatch(id: string) {
    return this.prisma.watch.update({ where: { id }, data: { status: WatchStatus.APPROVED } });
  }

  rejectWatch(id: string) {
    return this.prisma.watch.update({ where: { id }, data: { status: WatchStatus.REJECTED } });
  }

  releaseOrder(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: { escrowStatus: EscrowStatus.RELEASED, status: OrderStatus.COMPLETED },
    });
  }

  refundOrder(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: { escrowStatus: EscrowStatus.REFUNDED, status: OrderStatus.CANCELLED },
    });
  }

  listDisputes() {
    return this.prisma.dispute.findMany({ include: { order: true } });
  }

  async resolveDispute(id: string, action: 'REFUND' | 'RELEASE') {
    const statusUpdate = action === 'REFUND'
      ? { escrowStatus: EscrowStatus.REFUNDED, status: OrderStatus.CANCELLED }
      : { escrowStatus: EscrowStatus.RELEASED, status: OrderStatus.COMPLETED };

    const dispute = await this.prisma.dispute.update({ where: { id }, data: { status: DisputeStatus.RESOLVED } });
    const order = await this.prisma.order.update({ where: { id: dispute.orderId }, data: statusUpdate });

    return { dispute, order };
  }
}
