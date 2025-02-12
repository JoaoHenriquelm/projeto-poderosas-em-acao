import { randomUUID } from "crypto";
import { Either, failure, success } from "../errors/either";


export interface UserProtocol {
	get name(): string;
	get hashPassword(): string;
    get id(): string
}

export interface UserProps {
	_id: string;
	name: string;
    hashPassword: string;
}

type CreateUser = Either<{ message: string }, User>;

export class User implements UserProtocol {
	private constructor(private props: UserProps) {}

	static with(props: UserProps) {
		return new User(props);
	}

	static createUser(
        name: string,
        hashPassword: string
	): CreateUser {
        if(!name || !hashPassword) {
            return failure({message: 'Preencha todos os campos'})
        }
		return success(
			new User({
				_id: randomUUID().toString(),
				name,
                hashPassword
			})
		);
	}
    get hashPassword(): string {
        return this.props.hashPassword
    }
    get name(): string {
        return this.props.name
    }
    get id(): string {
        return this.props._id
    }
}