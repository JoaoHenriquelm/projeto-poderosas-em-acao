import { Either, failure, success } from "../errors/either";
import { UserRepository } from "../repositories/user-repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface LoginUserRequest {
	name: string;
	password: string;
}

export type LoginUserResponse = Either<{ message: string }, { token: string }>;

interface LoginUserProtocol {
	execute(request: LoginUserRequest): Promise<LoginUserResponse>;
}

export class LoginUser implements LoginUserProtocol {
	constructor(private repository: UserRepository) {}

	async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
		const user = await this.repository.findUserPerName(request.name);

		if (user === null) {
			return failure({ message: "Esse usuário não existe" });
		}

		const verifyPass = await bcrypt.compare(
			request.password,
			user.hashPassword
		);
		if (!verifyPass) {
			return failure({ message: "A senha está incorreta" });
		}

		const token = jwt.sign({ name: user.name, id: user.id }, process.env.JWT_PASS || "", {
			expiresIn: '30d'
		});

        return success({token})
	}
}
