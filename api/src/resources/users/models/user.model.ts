
import { AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { BandMember } from '../../../associations/BandMembers/BandMember.model';
import { BoughtProduct } from '../../../associations/BoughtProducts/BoughtProduct.model';
import { FanRecord } from '../../../associations/FanRecords/fanRecord.model';
import { GroupieRecord } from '../../../associations/GroupieRecords/GroupieRecord.model';
import { Band } from '../../bands/models/band.model';
import { Product } from '../../products/models/product.model';

@Table
export class User extends Model {
	
	@PrimaryKey
	@Column
	id: string;
	
	@Column
	auth0DbConnection: string;
	
	@Unique
	@Column
	username: string;
	
	@Column(DataType.TEXT)
	description: string;
	
	@Column(DataType.BLOB)
	picture: string;
	
	@AllowNull(false)
	@Column
	roleName: string;

	@BelongsToMany(() => Band, () => BandMember)
	joinedBands: Band[];
	
	@BelongsToMany(() => Product, () => BoughtProduct)
	boughtProducts: Product[];
	
	@BelongsToMany(() => Band, () => FanRecord)
	likedBands: Band[];
	
	@BelongsToMany(() => Band, () => GroupieRecord)
	subbedBands: Band[];
	
}
