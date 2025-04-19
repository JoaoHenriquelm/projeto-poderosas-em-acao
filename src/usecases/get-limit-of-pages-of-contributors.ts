import { AssociateRepository } from "../repositories/associate-repository";

export type GetLimitOfPagesOfContributorsResponse = number 

export interface GetLimitOfPagesOfContributorsProtocol {
    execute(limit: number): Promise<number>;
}

export class GetLimitOfPagesOfContributors implements GetLimitOfPagesOfContributorsProtocol {
    constructor(private repository: AssociateRepository) {}

    async execute(limit = 10): Promise<GetLimitOfPagesOfContributorsResponse> {
        const numberOfPages = await this.repository.getNumberOfPagesContributors(limit);
        return numberOfPages;
    }
}
