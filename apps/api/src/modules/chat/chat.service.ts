import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  createMessage(orderId: string, senderId: string, content: string) {
    return this.prisma.message.create({
      data: { orderId, senderId, content },
    });
  }

  listMessages(orderId: string) {
    return this.prisma.message.findMany({ where: { orderId }, include: { sender: true } });
  }
}
