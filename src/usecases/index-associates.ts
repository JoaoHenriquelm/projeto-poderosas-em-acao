import { Associate } from "../entities/associate";
import { Either, failure, success } from "../errors/either";
import { AssociateRepository } from "../repositories/associate-repository";

export type IndexAssociatesResponse = Either<
	{ value: Array<Associate>; message: string },
	Array<Associate>
>;

export interface IndexAssociatesProtocol {
	execute(limit: number, page: number): Promise<IndexAssociatesResponse>;
}

export class IndexAssociates implements IndexAssociatesProtocol {
	constructor(private repository: AssociateRepository) {}

	async execute(limit = 10, page = 1): Promise<IndexAssociatesResponse> {
		const searchAssociates = await this.repository.findAssociatesPerLimit(
			Number(limit),
			Number(page)
		);

		if (searchAssociates.length === 0) {
			return failure({
				value: searchAssociates,
				message: "Não foi encontrado nenhum associado"
			});
		}
		return success(searchAssociates);
	}
}
