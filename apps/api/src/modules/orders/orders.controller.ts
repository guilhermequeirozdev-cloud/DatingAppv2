import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Get()
  list(@Query('sellerId') sellerId?: string, @Query('buyerId') buyerId?: string) {
    return this.orders.list({ sellerId, buyerId });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.orders.get(id);
  }

  @Post()
  create(@Body() body: { buyerId: string; sellerId: string; watchId: string }) {
    return this.orders.create(body);
  }

  @Post(':id/confirm-delivery')
  confirmDelivery(@Param('id') id: string) {
    return this.orders.confirmDelivery(id);
  }

  @Post(':id/disputes')
  createDispute(@Param('id') id: string, @Body() body: { reason: string; comment?: string }) {
    return this.orders.createDispute(id, body);
  }
}
