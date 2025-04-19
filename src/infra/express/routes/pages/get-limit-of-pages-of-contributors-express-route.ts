import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import {GetLimitOfPagesOfContributors, GetLimitOfPagesOfContributorsResponse} from '../../../../usecases/get-limit-of-pages-of-contributors'

export type GetLimitOfPagesOfContributorsResponseHandler = {
    limitOfPages: number
} 

export type GetLimitOfPagesOfContributorsRequestHandler = {
    limit: number
}

export class GetLimitOfPagesOfContributorsRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getLimitOfPagesOfContributorsService: GetLimitOfPagesOfContributors
    ) {}

    static index(getLimitOfPagesOfContributorsService: GetLimitOfPagesOfContributors) {
        return new GetLimitOfPagesOfContributorsRoute(
            "/pages/contributors",
            HttpMethod.GET,
            getLimitOfPagesOfContributorsService
        );
    }
    getPath(): string {
        return this.path;
    }
    getMethod(): HttpMethod {
        return this.method;
    }

    getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { limit } = request.query

            const input: GetLimitOfPagesOfContributorsRequestHandler = {
                limit: Number(limit)
            };

            const output = await this.getLimitOfPagesOfContributorsService.execute(input.limit)
            
            const responseBody = this.present(output)
            
            response.status(200).send(responseBody)
        };
    }

    private present(
        input: GetLimitOfPagesOfContributorsResponse
    ): GetLimitOfPagesOfContributorsResponseHandler {
        return {
            limitOfPages: input
        }
    }
}
