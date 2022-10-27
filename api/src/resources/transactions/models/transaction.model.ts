import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, IsEmail, Model, Table, Unique } from 'sequelize-typescript';
import { Product } from '../../products/models/product.model';

@Table
export class Transaction extends Model {
		
	@Column(DataType.DECIMAL)
	totalAmount: number;
	
	@Column(DataType.DECIMAL)
	remainingAmount: number;
	
	@Column
	method: string;
	
	@Column
	recipient: string;
	
	@Column
	sender: string;
	
	@Column
	status: string
	
	@Column
	paidAt: Date;
	
	@ForeignKey(() => Product)
	productId: number;
	
	@BelongsTo(() => Product)
	product: Product;
	
	@Column
	molliePaymentId: string;
}
