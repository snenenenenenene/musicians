import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Band } from '../../bands/models/band.model';

@Table
export class Goal extends Model{
	
	@Column
	name: string;
	
	@Column
	amountToAchieve: number;

	@Column(DataType.TEXT)
	description: string;
	
	@ForeignKey(() => Band)
	ownerId: number;
	
	@BelongsTo(() => Band)
	owner: Band;
}
