import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Transaction } from '../../transactions/models/transaction.model';
import { Band } from '../../bands/models/band.model';
import { Sound } from '../../sounds/models/sound.model';
import { User } from '../../users/models/user.model';

@Table
export class Product extends Model {
	
	@Column 
	name: string;
	
	@Column
	price: number;
	
	@Column(DataType.TEXT)
	description: string;
	
	@Column(DataType.TEXT)
	thumbnail: string;
	
	@HasOne(() => Sound)
	sound: Sound;

	@BelongsTo(() => Band)
	owner: Band;
	
	@ForeignKey(() => Band)
	ownerId: number;
	
	@BelongsTo(() => User)
	buyer: User;
	
	@ForeignKey(() => User)
	buyerId: string;
	
	@HasMany(() => Transaction)
	transactions: Transaction[];

	
}
