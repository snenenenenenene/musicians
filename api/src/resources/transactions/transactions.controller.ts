import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  
  
  @Post('status')
  catchStatusChange(@Body() body: any) {
    console.log("STATUS WEBHOOK REQUEST BODY: \n" + JSON.stringify(body));
    return this.transactionsService.processPaymentStatusChange(body);
  }
  
  
  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findByPk(+id);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
