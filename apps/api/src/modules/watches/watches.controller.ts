import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { WatchStatus } from '@prisma/client';
import { WatchesService } from './watches.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('watches')
export class WatchesController {
  constructor(private watches: WatchesService) {}

  @Get()
  list(@Query('sellerId') sellerId?: string, @Query('status') status?: WatchStatus) {
    const resolvedStatus =
      status && Object.values(WatchStatus).includes(status)
        ? (status as WatchStatus)
        : WatchStatus.APPROVED;
    return this.watches.list({ sellerId, status: resolvedStatus });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.watches.get(id);
  }

  @Post()
  create(
    @Body()
    body: {
      brand: string;
      model: string;
      price: number;
      condition: string;
      description: string;
      images: string[];
      sellerId: string;
    },
  ) {
    return this.watches.create(body);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    return { url: `/${file.filename}` };
  }
}
