import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Band } from '../../resources/bands/models/band.model';
import { User } from '../../resources/users/models/user.model';

@Table
export class GroupieRecord extends Model {
	
	@ForeignKey(() => Band)
	@Column 
	subbedBandId: number;
	
	@ForeignKey(() => User)
	@Column
	groupieId: string;	
}