import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EscrowStatus, OrderStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  createPixPayment(orderId: string) {
    return {
      orderId,
      qrCode: 'mocked-qr-code-string',
      qrCodeImageUrl: '/mock/pix-qrcode.png',
      status: 'pending',
    };
  }

  async confirmPayment(orderId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.PAID,
        escrowStatus: EscrowStatus.HOLDING,
      },
    });
  }
}
