import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chat: ChatService) {}

  @Get(':orderId')
  list(@Param('orderId') orderId: string) {
    return this.chat.listMessages(orderId);
  }
}
