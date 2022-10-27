import { BankAccountDto } from "./BankAccount.dto";
import { IndividualDto } from "./Individual.dto"

export class AccountDetailsDto {
	individual: IndividualDto;
	bank_account: BankAccountDto;
}