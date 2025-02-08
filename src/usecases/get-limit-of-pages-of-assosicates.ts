import { AssociateRepository } from "../repositories/associate-repository";

export type GetLimitOfPagesOfAssociatesResponse = number 

export interface GetLimitOfPagesOfAssociatesProtocol {
    execute(limit: number): Promise<number>;
}

export class GetLimitOfPagesOfAssociates implements GetLimitOfPagesOfAssociatesProtocol {
    constructor(private repository: AssociateRepository) {}

    async execute(limit = 10): Promise<GetLimitOfPagesOfAssociatesResponse> {
        const numberOfPages = await this.repository.getNumberOfPages(limit);
        return numberOfPages;
    }
}
