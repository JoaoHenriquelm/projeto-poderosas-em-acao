import { Associate } from "../entities/associate";
import { Either, failure, success } from "../errors/either";
import { AssociateRepository } from "../repositories/associate-repository";

export interface ShowAssociatesRequest {
	name: string;
}

export type ShowAssociatesResponse = Either<
	{ value: Array<Associate>, message: string },
	Array<Associate>
>;

interface ShowAssociatesProtocol {
	execute(request: ShowAssociatesRequest): Promise<ShowAssociatesResponse>;
}

export class ShowAssociates implements ShowAssociatesProtocol {
	constructor(private repository: AssociateRepository) {}

	async execute(
		request: ShowAssociatesRequest
	): Promise<ShowAssociatesResponse> {
		const searchAssociates = await this.repository.findAssociatesPerName(
			request.name
		);
		if (searchAssociates.length === 0)
			return failure({
				value: searchAssociates,
				message: "Não existe associados com esse nome."
			});
		return success(searchAssociates);
	}
}
