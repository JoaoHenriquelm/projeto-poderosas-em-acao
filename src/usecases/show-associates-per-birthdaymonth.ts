import { Associate } from "../entities/associate";
import { Either, failure, success } from "../errors/either";
import { AssociateRepository } from "../repositories/associate-repository";

export type ShowAssociatesPerBithdayMonthRequest = {
	month: string;
}

export type ShowAssociatesPerBirthdayMonthResponse = Either<
	{ value: Array<Associate>; message: string },
	Array<Associate>
>;

export interface ShowAssociatesPerBirthdayMonthProtocol {
	execute(request: ShowAssociatesPerBithdayMonthRequest): Promise<ShowAssociatesPerBirthdayMonthResponse>;
}

export class ShowAssociatesPerBirthdayMonth
	implements ShowAssociatesPerBirthdayMonthProtocol
{
	constructor(private repository: AssociateRepository) {}

	async execute(request: ShowAssociatesPerBithdayMonthRequest): Promise<ShowAssociatesPerBirthdayMonthResponse> {
		if(Number(request.month) < 1 || Number(request.month) > 12) return failure({
			value: [],
			message: "Esse mês não existe"
		});
		const searchAssociates =
			await this.repository.findAssociatesPerBirthdayMonth(request.month);

		if (searchAssociates.length === 0)
			return failure({
				value: searchAssociates,
				message: "Não há associado fazendo aniversário nesse mês"
			});
		return success(searchAssociates);
	}
}
