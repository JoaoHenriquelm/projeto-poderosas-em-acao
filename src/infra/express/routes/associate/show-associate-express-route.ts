import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { Associate } from "../../../../entities/associate";
import { ShowAssociate, ShowAssociateRequest, ShowAssociateResponse } from "../../../../usecases/show-associate";

export type ShowAssociateResponseHandler = {
    value: null, message: string
} | Associate

export type ShowAssociateRequestHandler = ShowAssociateRequest

export class ShowAssociateRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly showAssociateService: ShowAssociate
    ) {}

    static show(showAssociateService: ShowAssociate) {
        return new ShowAssociateRoute(
            "/associate/:cpf",
            HttpMethod.GET,
            showAssociateService
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
            const { cpf } = request.params;

            const input: ShowAssociateRequestHandler = {
                cpf
            };

            const output = await this.showAssociateService.execute(input)
            
            const responseBody = this.present(output)
            
            response.status(output.isRight()? 200 : 400).send(responseBody)
        };
    }

    private present(
        input: ShowAssociateResponse
    ): ShowAssociateResponseHandler {
        if(input.isRight()) {
            return input.value
        } else {
            return input.reason
        }
    }
}
