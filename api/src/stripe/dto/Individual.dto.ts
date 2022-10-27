
export class IndividualDto {
	readonly first_name: string;
	readonly last_name: string;
	readonly phone: string;
	readonly email: string;
	readonly dob: DateOfBirth;
	readonly address: Address;
}

class DateOfBirth {
	day: number;
	month: number;
	year: number;
}

class Address {
	line1: string;
	postal_code: string;
	city: string;
	country: string;
}
