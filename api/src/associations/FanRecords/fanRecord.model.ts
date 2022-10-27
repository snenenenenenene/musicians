import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Band } from '../../resources/bands/models/band.model';
import { User } from '../../resources/users/models/user.model';

@Table
export class FanRecord extends Model {
	
	
	@ForeignKey(() => Band)
	@Column 
	likedBandId: number;
	
	@ForeignKey(() => User)
	@Column
	fanId: string;	
}
