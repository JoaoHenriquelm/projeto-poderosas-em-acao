import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { Attend } from "../../../../entities/attend";
import { ShowAttend, ShowAttendRequest, ShowAttendResponse } from "../../../../usecases/show-attend";

export type ShowAttendResponseHandler = {
    value: null, message: string
} | Attend

export type ShowAttendRequestHandler = ShowAttendRequest

export class ShowAttendRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly showAttendService: ShowAttend
    ) {}

    static show(showAttendService: ShowAttend) {
        return new ShowAttendRoute(
            "/attend/:cpf",
            HttpMethod.GET,
            showAttendService
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

            const input: ShowAttendRequestHandler = {
                cpf
            };

            const output = await this.showAttendService.execute(input)
            
            const responseBody = this.present(output)
            
            response.status(output.isRight()? 200 : 400).send(responseBody)
        };
    }

    private present(
        input: ShowAttendResponse
    ): ShowAttendResponseHandler {
        if(input.isRight()) {
            return input.value
        } else {
            return input.reason
        }
    }
}
