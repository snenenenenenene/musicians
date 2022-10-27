import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntitiesConstants } from '../../database/entities.constants';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './models/transaction.model';

@Injectable()
export class TransactionsService {

  
  constructor (
    @Inject(EntitiesConstants.TRANSACTION_REPOSITORY)
    private transactionRepository: typeof Transaction,
  ) {}
  
  
  /* Create a new transaction
    Send a confirmation mail after each successful transaction.
    
    EXCEPTIONS:
    - given sender id not found
    - foreign key constraint:
        bandIds and userIds should not be updated
    - only musicians can update a product
    - updating a product that does not match own bandId
    
    - before bands can make payments, they first would need to create a stripe account.
  */
  async createPayment(productId: number, transaction: CreateTransactionDto) {
    try {
      
      
      
    } catch(err) {
      console.log(err)
      throw err;
    }
  }
  
  
  /* Function that will be triggered by mollie by the webhook thingy
    Reference used: https://docs.mollie.com/overview/webhooks
    
    Furthermore, the webhook will be called when:

      A refund is performed on the payment, and the refund reaches state refunded or failed.
      A chargeback is received on the payment.
  */
  async processPaymentStatusChange(payment: any) {
    console.log("processing payment status: \n" + JSON.stringify(payment));
    
    
    
  }
  

  /* Find all transactions
  
    EXCEPTIONS:
    - given id not found
    - foreign key constraint:
        bandIds and userIds should not be updated
    - only musicians can update a product
    - updating a product that does not match own bandId
  */
  findAll() {
    return this.transactionRepository.findAll();
  }

  /* Find a transaction
  
    EXCEPTIONS:
    - given id not found
  */
  async findByPk(id: number) {
    const foundRecord = await this.transactionRepository.findByPk(id);
    
    if(foundRecord) return foundRecord;
    else throw new NotFoundException;
  }

  /* Update a transaction
  
    EXCEPTIONS:
    - given id not found
  */
  update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<[number]> {
    return this.transactionRepository.update({updateTransactionDto}, {
      where: { id: +id }
    });
  }
  

  /* Delete a transaction
  
    EXCEPTIONS:
    - given id not found
        
    - foreign key constraint:
        Cannot delete a transaction when invalid
  */
  remove(id: number): Promise<number> {
    return this.transactionRepository.destroy({
      where: { id: +id }
    });
  }
}
