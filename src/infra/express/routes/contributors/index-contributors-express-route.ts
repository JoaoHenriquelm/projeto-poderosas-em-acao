import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { Associate } from "../../../../entities/associate";
import { IndexContributors, IndexContributorsResponse } from "../../../../usecases/index-contributors";


export type IndexContributorsResponseHandler = {
    value: Array<Associate>, message: string
} | Array<Associate>

export type IndexContributorsRequestHandler = {
    limit: number
    page: number
}

export class IndexContributorsRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly indexContributorsService: IndexContributors
    ) {}

    static index(indexContributorsService: IndexContributors) {
        return new IndexContributorsRoute(
            "/contributors",
            HttpMethod.GET,
            indexContributorsService
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
            const { limit, page } = request.query

            const input: IndexContributorsRequestHandler = {
                limit: Number(limit),
                page: Number(page)
            };

            const output = await this.indexContributorsService.execute(input.limit, input.page)
            
            const responseBody = this.present(output)
            
            response.status(output.isRight()? 200 : 400).send(responseBody)
        };
    }

    private present(
        input: IndexContributorsResponse
    ): IndexContributorsResponseHandler {
        if(input.isRight()) {
            return input.value
        } else {
            return input.reason
        }
    }
}
