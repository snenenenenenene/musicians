import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Goal } from '../../goals/models/goal.model';
import { Product } from '../../products/models/product.model';
import { FanRecord } from '../../../associations/FanRecords/fanRecord.model';
import { GroupieRecord } from '../../../associations/GroupieRecords/GroupieRecord.model';
import { Sound } from '../../sounds/models/sound.model';
import { BandMember } from '../../../associations/BandMembers/BandMember.model';

@Table
export class Band extends Model {  
	
	@Column
	name: string;
	
	@Column
	stripeId: string
  
	@Column
	location: string;
		
	@Column(DataType.TEXT)
	description: string;
	
	@Column(DataType.TEXT)
	picture: string;
  
	@Column({ defaultValue: 0 })
	fansCount: number;
	
	@Column({ defaultValue: 0 })
	groupiesCount: number;
	
	@BelongsToMany(() => User, () => BandMember)
	members: User[]
	
	@HasMany(() => Product)
	products: Product[];
		
	@HasMany(() => Goal)
	goals: Goal[];
	
	@HasMany(() => Sound) 
	sounds: Sound[]
	
	@BelongsToMany(() => User, () => FanRecord)
	fans: User[]
	
	@BelongsToMany(() => User, () => GroupieRecord)
	groupies: User[]

}
