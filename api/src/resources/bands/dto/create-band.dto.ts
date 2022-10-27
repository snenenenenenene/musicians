import { Optional } from "sequelize/types";

export interface CreateBandDto extends Optional<any, string>{
	readonly name: string;
	readonly location: string;
	readonly description: string;
	readonly members: string[];
}
