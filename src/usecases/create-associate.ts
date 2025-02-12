
import { Associate } from "../entities/associate";
import { Either, failure, success } from "../errors/either";
import { AssociateRepository } from "../repositories/associate-repository";

export interface CreateAssociateRequest {
	fullName: string;
	dateOfBirth: string;
	natiolity: string;
	maritalStatus: string;
	cpf: string;
	rg: string;
	issuingBody: string;
	address: string;
	street: string;
	city: string;
	cep: string;
	state: string;
	homePhone: string;
	cellPhone: string;
	email: string;
	associationCategory: string;
	contribuitionAmount: string;
	paymentMethod: string;
	responsibleCPF: string;
	responsibleName: string;
}

export type CreateAssociateResponse = Either<{ message: string }, { id: string }>;

interface CreateAssociateProtocol {
	execute(request: CreateAssociateRequest): Promise<CreateAssociateResponse>;
}

export class CreateAssociate implements CreateAssociateProtocol {
	constructor(private repository: AssociateRepository) {}

	async execute(
		request: CreateAssociateRequest
	): Promise<CreateAssociateResponse> {
		if (await this.repository.associateExistByCpf(request.cpf))
			return failure({ message: "Esse associado já tem seu cpf cadastrado." });

		const associate = Associate.createAssociate(request.fullName, request.dateOfBirth, request.natiolity, request.maritalStatus, request.cpf, request.rg, request.issuingBody, request.address, request.street, request.city, request.cep, request.state, request.homePhone, request.cellPhone, request.email, request.associationCategory, request.contribuitionAmount, request.paymentMethod, request.responsibleCPF, request.responsibleName);
		if (associate.isRight()) {
			this.repository.store(associate.value);
			return success({id: associate.value.id});
		} else {
			return failure(associate.reason);
		}
	}
}
