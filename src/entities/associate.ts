import { randomUUID } from "crypto";
import { Either, failure, success } from "../errors/either";
import { ValidatorAdapter } from "../utils/validatorAdapter";

export interface AssociateProtocol {
	get fullName(): string;
	get dateOfBirth(): string;
	get natiolity(): string;
	get maritalStatus(): string;
	get cpf(): string;
	get rg(): string;
	get issuingBody(): string;
	get address(): string;
	get street(): string;
	get city(): string;
	get cep(): string;
	get state(): string;
	get homePhone(): string;
	get cellPhone(): string;
	get email(): string;
	get associationCategory(): string;
	get contribuitionAmount(): string;
	get paymentMethod(): string;
	get responsibleCPF(): string;
	get responsibleName(): string;
	get id(): string;
	get monthBirthday(): string;
	get dayBirthday(): number;
}

export interface AssociateProps {
	_id: string;
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
	monthBirthday: string;
	dayBirthday: number;
}

type CreateAssociate = Either<{ message: string }, Associate>;

export class Associate implements AssociateProtocol {
	private constructor(private props: AssociateProps) {}

	static with(props: AssociateProps) {
		return new Associate(props);
	}

	static createAssociate(
		fullName: string,
		dateOfBirth: string,
		natiolity: string,
		maritalStatus: string,
		cpf: string,
		rg: string,
		issuingBody: string,
		address: string,
		street: string,
		city: string,
		cep: string,
		state: string,
		homePhone: string,
		cellPhone: string,
		email: string,
		associationCategory: string,
		contribuitionAmount: string,
		paymentMethod: string,
		responsibleCPF: string,
		responsibleName: string
	): CreateAssociate {
		const validatorAdapter = new ValidatorAdapter();
		if (!validatorAdapter.isCPF(cpf)) {
			return failure({ message: "O cpf deve ser válido" });
		}
		return success(
			new Associate({
				_id: randomUUID().toString(),
				fullName: fullName
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "")
					.toUpperCase(),
				address,
				associationCategory,
				cellPhone,
				cep,
				city,
				contribuitionAmount: contribuitionAmount || 'Não se aplica',
				cpf,
				dateOfBirth,
				email,
				homePhone,
				issuingBody,
				maritalStatus,
				natiolity,
				paymentMethod,
				responsibleCPF: responsibleCPF || "Não se aplica",
				responsibleName: responsibleName || "Não se aplica",
				rg,
				state,
				street,
				monthBirthday: dateOfBirth.slice(5, 7),
				dayBirthday: Number(dateOfBirth.slice(8, 10))
			})
		);
	}
	get dayBirthday(): number {
		return this.props.dayBirthday;
	}
	get address(): string {
		return this.props.address;
	}
	get associationCategory(): string {
		return this.props.associationCategory;
	}
	get cellPhone(): string {
		return this.props.cellPhone;
	}
	get cep(): string {
		return this.props.cep;
	}
	get city(): string {
		return this.props.city;
	}
	get contribuitionAmount(): string {
		return this.props.contribuitionAmount;
	}
	get cpf(): string {
		return this.props.cpf;
	}
	get dateOfBirth(): string {
		return this.props.dateOfBirth;
	}
	get email(): string {
		return this.props.email;
	}
	get fullName(): string {
		return this.props.fullName;
	}
	get homePhone(): string {
		return this.props.homePhone;
	}
	get issuingBody(): string {
		return this.props.issuingBody;
	}
	get maritalStatus(): string {
		return this.props.maritalStatus;
	}
	get natiolity(): string {
		return this.props.natiolity;
	}
	get paymentMethod(): string {
		return this.props.paymentMethod;
	}
	get responsibleCPF(): string {
		return this.props.responsibleCPF;
	}
	get responsibleName(): string {
		return this.props.responsibleName;
	}
	get rg(): string {
		return this.props.rg;
	}
	get state(): string {
		return this.props.state;
	}
	get street(): string {
		return this.props.street;
	}
	get id(): string {
		return this.props._id;
	}
	get monthBirthday(): string {
		return this.props.monthBirthday;
	}
}
