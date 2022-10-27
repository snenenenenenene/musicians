import { Controller, Get, Param } from '@nestjs/common';
import { GoalsService } from './goals.service';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}
  
  /* Get all saved goals
    
  */
  @Get()
  findAll() {
    return this.goalsService.findAll();
  }
  
  /* Get a goal by id
    
  */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalsService.findByPk(+id);
  }

}
