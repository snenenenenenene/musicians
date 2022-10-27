import { Controller, Get, Param } from '@nestjs/common';
import { SoundsService } from './sounds.service';

@Controller('sounds')
export class SoundsController {
  constructor(private readonly soundsService: SoundsService) {}
  
  @Get()
  findAll() {
    return this.soundsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.soundsService.findByPk(+id);
  }


}
