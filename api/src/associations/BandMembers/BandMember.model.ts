import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Band } from '../../resources/bands/models/band.model';
import { User } from '../../resources/users/models/user.model';

@Table
export class BandMember extends Model {
	
	@ForeignKey(() => Band)
	@Column 
	bandId: number;
	
	@ForeignKey(() => User)
	@Column
	musicianId: string;	
}