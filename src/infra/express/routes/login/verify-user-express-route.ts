import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import {
	VerifyToken,
	VerifyTokenRequest,
    VerifyTokenResponse
} from "../../../../usecases/verify-token";

export type VerifyTokenResponseHandler =
	| {
            isValid: boolean
			message: string;
	  }
	| {
			isValid: boolean;
	  };

export type VerifyTokenRequestHandler = VerifyTokenRequest;

export class VerifyTokenRoute implements Route {
	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		private readonly verifyTokenService: VerifyToken
	) {}

	static create(VerifyTokenService: VerifyToken) {
		return new VerifyTokenRoute(
			"/login/verify",
			HttpMethod.POST,
			VerifyTokenService
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
			const { token }: VerifyTokenRequestHandler = request.body;

			const input: VerifyTokenRequestHandler = { token };

			const output = await this.verifyTokenService.execute(input);

			const responseBody = this.present(output);

			response.status(output.isRight() ? 200 : 400).send(responseBody);
		};
	}

	private present(input: VerifyTokenResponse): VerifyTokenResponseHandler {
		if (input.isRight()) {
			return input.value;
		} else {
			return input.reason;
		}
	}
}
