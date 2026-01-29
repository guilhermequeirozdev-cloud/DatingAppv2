import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private admin: AdminService) {}

  @Get('watches')
  listWatches() {
    return this.admin.listPendingWatches();
  }

  @Post('watches/:id/approve')
  approveWatch(@Param('id') id: string) {
    return this.admin.approveWatch(id);
  }

  @Post('watches/:id/reject')
  rejectWatch(@Param('id') id: string) {
    return this.admin.rejectWatch(id);
  }

  @Post('orders/:id/release')
  releaseOrder(@Param('id') id: string) {
    return this.admin.releaseOrder(id);
  }

  @Post('orders/:id/refund')
  refundOrder(@Param('id') id: string) {
    return this.admin.refundOrder(id);
  }

  @Get('disputes')
  listDisputes() {
    return this.admin.listDisputes();
  }

  @Post('disputes/:id/resolve')
  resolveDispute(@Param('id') id: string, @Body() body: { action: 'REFUND' | 'RELEASE' }) {
    return this.admin.resolveDispute(id, body.action);
  }
}
