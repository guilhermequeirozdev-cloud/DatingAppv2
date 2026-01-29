import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private shipping: ShippingService) {}

  @Post('calculate')
  calculate(@Body() body: { destinationZip: string }) {
    return this.shipping.calculate(body.destinationZip);
  }

  @Post('create')
  create(@Body() body: { orderId: string }) {
    return this.shipping.create(body.orderId);
  }

  @Get('track/:code')
  track(@Param('code') code: string) {
    return this.shipping.track(code);
  }
}
