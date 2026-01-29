import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WatchesService } from './watches.service';

@Controller('watches')
export class WatchesController {
  constructor(private watches: WatchesService) {}

  @Get()
  list() {
    return this.watches.list();
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
}
