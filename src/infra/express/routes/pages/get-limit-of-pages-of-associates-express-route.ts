import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import {GetLimitOfPagesOfAssociates, GetLimitOfPagesOfAssociatesResponse} from '../../../../usecases/get-limit-of-pages-of-assosicates'

export type GetLimitOfPagesOfAssociatesResponseHandler = {
    limitOfPages: number
} 

export type GetLimitOfPagesOfAssociatesRequestHandler = {
    limit: number
}

export class GetLimitOfPagesOfAssociatesRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly GetLimitOfPagesOfAssociatesService: GetLimitOfPagesOfAssociates
    ) {}

    static index(GetLimitOfPagesOfAssociatesService: GetLimitOfPagesOfAssociates) {
        return new GetLimitOfPagesOfAssociatesRoute(
            "/pages/associates",
            HttpMethod.GET,
            GetLimitOfPagesOfAssociatesService
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

            const input: GetLimitOfPagesOfAssociatesRequestHandler = {
                limit: Number(limit)
            };

            const output = await this.GetLimitOfPagesOfAssociatesService.execute(input.limit)
            
            const responseBody = this.present(output)
            
            response.status(200).send(responseBody)
        };
    }

    private present(
        input: GetLimitOfPagesOfAssociatesResponse
    ): GetLimitOfPagesOfAssociatesResponseHandler {
        return {
            limitOfPages: input
        }
    }
}
