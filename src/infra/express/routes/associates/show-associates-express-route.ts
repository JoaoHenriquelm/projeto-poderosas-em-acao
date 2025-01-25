import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { Associate } from "../../../../entities/associate";
import { ShowAssociates, ShowAssociatesRequest, ShowAssociatesResponse } from "../../../../usecases/show-associates";

export type ShowAssociatesResponseHandler = {
    value: Array<Associate>, message: string
} | Array<Associate>

export type ShowAssociatesRequestHandler = ShowAssociatesRequest

export class ShowAssociatesRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly showAssociatesService: ShowAssociates
    ) {}

    static show(showAssociatesService: ShowAssociates) {
        return new ShowAssociatesRoute(
            "/associates/:name",
            HttpMethod.GET,
            showAssociatesService
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
            const { name } = request.params;

            const input: ShowAssociatesRequestHandler = {
                name
            };

            const output = await this.showAssociatesService.execute(input)
            
            const responseBody = this.present(output)
            
            response.status(output.isRight()? 200 : 400).send(responseBody)
        };
    }

    private present(
        input: ShowAssociatesResponse
    ): ShowAssociatesResponseHandler {
        if(input.isRight()) {
            return input.value
        } else {
            return input.reason
        }
    }
}
