import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private chat: ChatService) {}

  @SubscribeMessage('join')
  handleJoin(@MessageBody() body: { orderId: string }, @ConnectedSocket() client: Socket) {
    client.join(body.orderId);
    return { joined: body.orderId };
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() body: { orderId: string; senderId: string; content: string },
  ) {
    const message = await this.chat.createMessage(body.orderId, body.senderId, body.content);
    this.server.to(body.orderId).emit('message', message);
    return message;
  }
}
