import { Attend, EmergencyContact, ResponsibleData } from "../entities/attend";
import { Either, failure, success } from "../errors/either";

import { AttendRepository } from "../repositories/attend-repository";

export interface CreateAttendRequest {
	fullName: string;
	dateOfBirth: string;
	ageSigned: string
	natiolity: string;
	maritalStatus: string;
	cpf: string;
	rg: string;
	address: string;
	street: string;
	city: string;
	cep: string;
	state: string;
	homePhone: string;
	cellPhone: string;
	email: string;

	currentSchool: string;
	dependents: string;
	numberOfDependents: string;
	relationOfDependents: string;
	diagnosisYear: string;
	amountOfQuimi: string;
	amountOfRad: string;
	mastologis: string;
	oncologist: string;
	hadSurgery: string;
	typeSurgery: string;
	vaccines: string;
	allergies: string;
	specialsConditions: string;
	continuousUseMedications: string;
	observations: string;
	medicalInsurance: string;
	working: string;
	functionWork: string;
	activityOfInterest: string;
	preferredParticipationShift: string;
	authorizationUseImage: string

	emergencyContact: EmergencyContact;
	dataOfResponsible?: ResponsibleData;
}

export type CreateAttendResponse = Either<{ message: string }, { id: string }>;

interface CreateAttendProtocol {
	execute(request: CreateAttendRequest): Promise<CreateAttendResponse>;
}

export class CreateAttend implements CreateAttendProtocol {
	constructor(private repository: AttendRepository) {}

	async execute(request: CreateAttendRequest): Promise<CreateAttendResponse> {
		if (await this.repository.attendExistByCpf(request.cpf))
			return failure({ message: "Esse assistido já tem seu cpf cadastrado." });

		const attend = Attend.associateCategory(
			request.fullName,
			request.dateOfBirth,
			request.ageSigned,
			request.natiolity,
			request.maritalStatus,
			request.cpf,
			request.rg,
			request.address,
			request.street,
			request.city,
			request.cep,
			request.state,
			request.homePhone,
			request.cellPhone,
			request.email,
			request.currentSchool,
			request.dependents,
			request.numberOfDependents,
			request.relationOfDependents,
			request.diagnosisYear,
			request.amountOfQuimi,
			request.amountOfRad,
			request.mastologis,
			request.oncologist,
			request.hadSurgery,
			request.typeSurgery,
			request.vaccines,
			request.allergies,
			request.specialsConditions,
			request.observations,
			request.medicalInsurance,
			request.working,
			request.functionWork,
			request.activityOfInterest,
			request.preferredParticipationShift,
			request.continuousUseMedications,
			request.authorizationUseImage,
			request.emergencyContact,
			request.dataOfResponsible
		);

		if (attend.isRight()) {
			this.repository.store(attend.value);
			return success({ id: attend.value.id });
		} else {
			return failure(attend.reason);
		}
	}
}
