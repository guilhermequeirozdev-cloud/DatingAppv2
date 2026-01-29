import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WatchStatus } from '@prisma/client';

@Injectable()
export class WatchesService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.watch.findMany({ include: { seller: true } });
  }

  get(id: string) {
    return this.prisma.watch.findUnique({ where: { id }, include: { seller: true } });
  }

  async create(data: {
    brand: string;
    model: string;
    price: number;
    condition: string;
    description: string;
    images: string[];
    sellerId: string;
  }) {
    const watch = await this.prisma.watch.create({
      data: {
        ...data,
        images: data.images.join(','),
        status: WatchStatus.PENDING,
      },
    });

    return {
      watch,
      ai: this.mockAi(data.images),
    };
  }

  private mockAi(images: string[]) {
    const score = Math.floor(85 + Math.random() * 13);
    return {
      score,
      verdict: 'AUTENTICO',
      notes: 'Acabamento e logotipo consistentes',
      images,
    };
  }
}
