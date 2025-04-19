import { Associate } from "../entities/associate";

export interface AssociateRepository {
	store(associate: Associate): Promise<void>;
	associateExistByCpf(cpf: string): Promise<boolean>;
	findAssociatePerCpf(cpf: string): Promise<Associate | null>;
	findAssociatesPerName(name: string): Promise<Array<Associate>>;
	findAssociatesPerBirthdayMonth(
		currentMonthString: string
	): Promise<Array<Associate>>;
	findAssociatesPerLimit(
		limit: number,
		page: number
	): Promise<Array<Associate>>;
	getNumberOfPages(
		limit: number,
	): Promise<number>
	getNumberOfPagesContributors(limit: number): Promise<number>
	findContributorsOrderByContribuitionAmountPerLimit(
		limit: number,
		page: number
	): Promise<Array<Associate>>
}
