import { Associate } from "../entities/associate";
import { Either, failure, success } from "../errors/either";
import { AssociateRepository } from "../repositories/associate-repository";

export type IndexContributorsResponse = Either<
    { value: Array<Associate>; message: string },
    Array<Associate>
>;

export interface IndexContributorsProtocol {
    execute(limit: number, page: number): Promise<IndexContributorsResponse>;
}

export class IndexContributors implements IndexContributorsProtocol {
    constructor(private repository: AssociateRepository) {}

    async execute(limit = 10, page = 1): Promise<IndexContributorsResponse> {
        const searchContributors = await this.repository.findContributorsOrderByContribuitionAmountPerLimit(
            Number(limit),
            Number(page)
        );

        if (searchContributors.length === 0) {
            return failure({
                value: searchContributors,
                message: "Não foi encontrado nenhum contribuinte"
            });
        }
        return success(searchContributors);
    }
}
