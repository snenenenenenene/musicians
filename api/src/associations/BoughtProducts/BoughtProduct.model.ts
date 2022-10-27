import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from '../../resources/products/models/product.model';
import { User } from '../../resources/users/models/user.model';

@Table
export class BoughtProduct extends Model {
	
	@ForeignKey(() => Product)
	@Column 
	productId: number;
	
	@ForeignKey(() => User)
	@Column
	buyerId: string;	
}