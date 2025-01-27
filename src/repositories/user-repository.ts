import { User } from "../entities/user";

export interface UserRepository {
    store(user: User): Promise<void>;
    findUserPerName(name: string): Promise<User | null>
}
