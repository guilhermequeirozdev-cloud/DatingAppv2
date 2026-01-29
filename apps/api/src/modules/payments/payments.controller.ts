import { Body, Controller, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private payments: PaymentsService) {}

  @Post('pix')
  createPix(@Body() body: { orderId: string }) {
    return this.payments.createPixPayment(body.orderId);
  }

  @Post('mock-confirm/:orderId')
  confirm(@Param('orderId') orderId: string) {
    return this.payments.confirmPayment(orderId);
  }
}
