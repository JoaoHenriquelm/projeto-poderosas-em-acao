import mongoose from "mongoose";
import { UserRepository } from "../../user-repository";
import { IUser, UserSchema } from "./mongoDB-userSchema";
import { User } from "../../../entities/user";

export class MongoDBUser implements UserRepository {
	private userModel = mongoose.model<IUser>(
		"User",
		UserSchema
	);
	async store(user: User): Promise<void> {
		await this.userModel.create({
			_id: user.id,
			name: user.name,
			hashPassword: user.hashPassword
		});
	}

	async findUserPerName(
		name: string
	): Promise<User | null> {
		const search = await this.userModel.findOne({
			name
		});
		if (search === null) {
			return null;
		}

		const user = User.with({
			_id: search.id,
			hashPassword: search.hashPassword,
			name: search.name
		});
		return user
	}


}
