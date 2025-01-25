import { Attend } from "../entities/attend";
import { Either, failure, success } from "../errors/either";
import { AttendRepository } from "../repositories/attend-repository";
export interface ShowAttendRequest {
	cpf: string;
}

export type ShowAttendResponse = Either<{ value: null; message: string }, Attend>;

interface ShowAttendProtocol {
	execute(request: ShowAttendRequest): Promise<ShowAttendResponse>;
}

export class ShowAttend implements ShowAttendProtocol {
	constructor(private repository: AttendRepository) {}

	async execute(request: ShowAttendRequest): Promise<ShowAttendResponse> {
		const searchAttend = await this.repository.findAttendPerCpf(request.cpf);
		if (searchAttend === null)
			return failure({
				value: searchAttend,
				message: "Não há assistido com esse cpf."
			});
		return success(searchAttend);
	}
}
