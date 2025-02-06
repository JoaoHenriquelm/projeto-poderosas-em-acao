import { Either, failure, success } from "../errors/either";
import { UserRepository } from "../repositories/user-repository";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface VerifyTokenRequest {
	token: string;
}

export type VerifyTokenResponse = Either<
	{ isValid: boolean; message: string },
	{ isValid: boolean }
>;

interface VerifyTokenProtocol {
	execute(request: VerifyTokenRequest): Promise<VerifyTokenResponse>;
}

export class VerifyToken implements VerifyTokenProtocol {
	constructor(private repository: UserRepository) {}

	async execute(request: VerifyTokenRequest): Promise<VerifyTokenResponse> {
		if (!request.token)
			return failure({
				isValid: false,
				message: "Nenhum token foi enviado."
			});

		const { name } = jwt.verify(
			request.token,
			process.env.JWT_PASS || ""
		) as JwtPayload;
		const user = await this.repository.findUserPerName(name);
		if (user === null) {
			return failure({
				isValid: false,
				message: "Usuário com esse token não existe"
			});
		}

		return success({ isValid: true });
	}
}
