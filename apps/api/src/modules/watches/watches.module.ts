import { Module } from '@nestjs/common';
import { WatchesController } from './watches.controller';
import { WatchesService } from './watches.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [WatchesController],
  providers: [WatchesService, PrismaService],
})
export class WatchesModule {}
