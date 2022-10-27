import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Band } from '../../bands/models/band.model';
import { Product } from '../../products/models/product.model';

@Table
export class Sound extends Model {
	
	@Column
	name: string;
	
	@Column(DataType.TEXT)
	file: string;
	
	// @Column
	// mediaType: string;
	
	@Default(0)
	@Column
	likesCount: number
	
	@ForeignKey(() => Band)
	ownerId: number;
	
	@BelongsTo(() => Band) 
	owner: Band;
	
	@ForeignKey(() => Product)
	productId: number;
	
	@BelongsTo(() => Product) 
	product: Product;
	
}
