import { Associate } from "../entities/associate";
import { Either, failure, success } from "../errors/either";
import { AssociateRepository } from "../repositories/associate-repository";

export interface ShowAssociateRequest {
	cpf: string;
}

export type ShowAssociateResponse = Either<
	{ value: null; message: string },
	Associate
>;

interface ShowAssociateProtocol {
	execute(request: ShowAssociateRequest): Promise<ShowAssociateResponse>;
}

export class ShowAssociate implements ShowAssociateProtocol {
	constructor(private repository: AssociateRepository) {}

	async execute(request: ShowAssociateRequest): Promise<ShowAssociateResponse> {
		const searchAssociate = await this.repository.findAssociatePerCpf(
			request.cpf
		);
		if (searchAssociate === null)
			return failure({
				value: searchAssociate,
				message: "Não há associado com esse cpf."
			});
		return success(searchAssociate);
	}
}
