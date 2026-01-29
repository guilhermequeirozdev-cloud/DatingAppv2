import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WatchStatus } from '@prisma/client';

@Injectable()
export class WatchesService {
  constructor(private prisma: PrismaService) {}

  list(filters?: { status?: WatchStatus; sellerId?: string }) {
    return this.prisma.watch.findMany({
      where: {
        status: filters?.status,
        sellerId: filters?.sellerId,
      },
      include: { seller: true },
    }).then((items) => items.map((item) => this.mapWatch(item)));
  }

  get(id: string) {
    return this.prisma.watch
      .findUnique({ where: { id }, include: { seller: true } })
      .then((item) => (item ? this.mapWatch(item) : null));
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
    const ai = this.mockAi(data.images);
    const watch = await this.prisma.watch.create({
      data: {
        ...data,
        images: data.images.join(','),
        status: WatchStatus.PENDING,
        aiScore: ai.score,
        aiVerdict: ai.verdict,
        aiNotes: ai.notes,
      },
    });

    return {
      watch,
      ai,
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

  private mapWatch(watch: { images: string }) {
    return {
      ...watch,
      images: watch.images.split(',').map((item) => item.trim()),
    };
  }
}
