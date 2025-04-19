import { User } from "../entities/user";
import { Either, failure, success } from "../errors/either";
import { UserRepository } from "../repositories/user-repository";
import bcrypt from "bcrypt";

export interface CreateUserRequest {
	name: string;
	password: string;
}

export type CreateUserResponse = Either<{ message: string }, { id: string }>;

interface CreateUserProtocol {
	execute(request: CreateUserRequest): Promise<CreateUserResponse>;
}

export class CreateUser implements CreateUserProtocol {
	constructor(private repository: UserRepository) {}

	async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
		const hashPassword = await bcrypt.hash(request.password, 8);

		const user = User.createUser(request.name, hashPassword);

		if (user.isRight()) {
			await this.repository.store(user.value);
			return success({ id: user.value.id });
		} else {
			return failure(user.reason);
		}
	}
}