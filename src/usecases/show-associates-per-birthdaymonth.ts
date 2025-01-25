import { Associate } from "../entities/associate";
import { Either, failure, success } from "../errors/either";
import { AssociateRepository } from "../repositories/associate-repository";

export type ShowAssociatesPerBirthdayMonthResponse = Either<
	{ value: Array<Associate>; message: string },
	Array<Associate>
>;

export interface ShowAssociatesPerBirthdayMonthProtocol {
	execute(): Promise<ShowAssociatesPerBirthdayMonthResponse>;
}

export class ShowAssociatesPerBirthdayMonth
	implements ShowAssociatesPerBirthdayMonthProtocol
{
	constructor(private repository: AssociateRepository) {}

	async execute(): Promise<ShowAssociatesPerBirthdayMonthResponse> {
		const currentMonthNumber = new Date().getMonth() + 1;
		const currentMonthString =
			currentMonthNumber < 10
				? `0${currentMonthNumber}`
				: `${currentMonthNumber}`;
		const searchAssociates =
			await this.repository.findAssociatesPerBirthdayMonth(currentMonthString);

		if (searchAssociates.length === 0)
			return failure({
				value: searchAssociates,
				message: "Não há associado fazendo aniversário nesse mês"
			});
		return success(searchAssociates);
	}
}
