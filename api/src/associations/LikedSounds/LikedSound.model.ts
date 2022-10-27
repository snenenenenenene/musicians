import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Sound } from '../../resources/sounds/models/sound.model';
import { User } from '../../resources/users/models/user.model';

@Table
export class LikedSound extends Model {
	
	@ForeignKey(() => Sound)
	@Column 
	soundId: number;
	
	@ForeignKey(() => User)
	@Column
	userId: string;	
}