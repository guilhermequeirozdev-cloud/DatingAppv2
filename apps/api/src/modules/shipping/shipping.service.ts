import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ShippingService {
  constructor(private prisma: PrismaService) {}

  calculate(destinationZip: string) {
    return {
      destinationZip,
      price: 120,
      deadlineDays: 4,
      provider: 'Correios (mock)',
    };
  }

  async create(orderId: string) {
    const trackingCode = `BR${Math.floor(100000000 + Math.random() * 900000000)}BR`;
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { trackingCode },
    });
    return { trackingCode, orderId: order.id };
  }

  track(code: string) {
    return {
      code,
      status: ['Postado', 'Em trânsito', 'Saiu para entrega', 'Entregue'],
    };
  }
}
