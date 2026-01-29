import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { WatchesModule } from './watches/watches.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ShippingModule } from './shipping/shipping.module';
import { AdminModule } from './admin/admin.module';
import { ChatModule } from './chat/chat.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    AuthModule,
    WatchesModule,
    OrdersModule,
    PaymentsModule,
    ShippingModule,
    AdminModule,
    ChatModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
