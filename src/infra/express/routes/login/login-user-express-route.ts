import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { LoginUser, LoginUserRequest, LoginUserResponse } from "../../../../usecases/login-user";

export type LoginUserResponseHandler =
	| {
			message: string;
	  }
	| {
			token: string;
	  };

export type LoginUserRequestHandler = LoginUserRequest;

export class LoginUserRoute implements Route {
	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		private readonly loginUserService: LoginUser
	) {}

	static create(loginUserService: LoginUser) {
		return new LoginUserRoute("/login", HttpMethod.POST, loginUserService);
	}
	getPath(): string {
		return this.path;
	}
	getMethod(): HttpMethod {
		return this.method;
	}

	getHandler(): (request: Request, response: Response) => Promise<void> {
		return async (request: Request, response: Response) => {
			const { name, password }: LoginUserRequestHandler = request.body;

			const input: LoginUserRequestHandler = { name, password };

			const output = await this.loginUserService.execute(input);

			const responseBody = this.present(output);

			response.status(output.isRight() ? 200 : 400).send(responseBody);
		};
	}

	private present(input: LoginUserResponse): LoginUserResponseHandler {
		if (input.isRight()) {
			return input.value;
		} else {
			return input.reason;
		}
	}
}
