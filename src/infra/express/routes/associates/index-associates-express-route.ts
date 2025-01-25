import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { Associate } from "../../../../entities/associate";
import { IndexAssociates, IndexAssociatesResponse } from "../../../../usecases/index-associates";


export type IndexAssociatesResponseHandler = {
    value: Array<Associate>, message: string
} | Array<Associate>

export type IndexAssociatesRequestHandler = {
    limit: number
    page: number
}

export class IndexAssociatesRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly indexAssociatesService: IndexAssociates
    ) {}

    static index(indexAssociatesService: IndexAssociates) {
        return new IndexAssociatesRoute(
            "/associates",
            HttpMethod.GET,
            indexAssociatesService
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

            const input: IndexAssociatesRequestHandler = {
                limit: Number(limit),
                page: Number(page)
            };

            const output = await this.indexAssociatesService.execute(input.limit, input.page)
            
            const responseBody = this.present(output)
            
            response.status(output.isRight()? 200 : 400).send(responseBody)
        };
    }

    private present(
        input: IndexAssociatesResponse
    ): IndexAssociatesResponseHandler {
        if(input.isRight()) {
            return input.value
        } else {
            return input.reason
        }
    }
}
