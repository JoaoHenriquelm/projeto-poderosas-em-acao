import mongoose from "mongoose";
import { UserProps } from "../../../entities/user";

export type IUser = UserProps

export const UserSchema = new mongoose.Schema<IUser>({
	_id: mongoose.Types.UUID,
	name: {type: String, required: true},
	hashPassword: {type: String, required: true},
});
