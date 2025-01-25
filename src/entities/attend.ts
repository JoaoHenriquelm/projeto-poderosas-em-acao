import { randomUUID } from "crypto";
import { Either, failure, success } from "../errors/either";
import { ValidatorAdapter } from "../utils/validatorAdapter";

export interface EmergencyContact {
	name: string;
	phoneNumber: string;
	kinship: string;
}

export interface ResponsibleData {
	fullName: string;
	kinship: string;
	dateOfBirth: string;
	rg: string;
	cpf: string;
	address: string;
	homePhone: string;
	cellPhone: string;
	email: string;
}

export interface AttendProtocol {
	get fullName(): string;
	get dateOfBirth(): string;
	get natiolity(): string;
	get maritalStatus(): string;
	get cpf(): string;
	get rg(): string;
	get address(): string;
	get street(): string;
	get city(): string;
	get cep(): string;
	get state(): string;
	get homePhone(): string;
	get cellPhone(): string;
	get email(): string;

	get currentSchool(): string;
	get dependents(): string;
	get numberOfDependents(): string;
	get relationOfDependents(): string;
	get diagnosisYear(): string;
	get amountOfQuimi(): string;
	get amountOfRad(): string;
	get mastologis(): string;
	get oncologist(): string;
	get hadSurgery(): string;
	get typeSurgery(): string;
	get vaccines(): string;
	get allergies(): string;
	get specialsConditions(): string;
	get observations(): string;
	get medicalInsurance(): string;
	get working(): string;
	get functionWork(): string;
	get activityOfInterest(): string;
	get preferredParticipationShift(): string;

	get emergencyContact(): EmergencyContact;
	get dataOfResponsible(): ResponsibleData | undefined;

	get id(): string;
	get monthBirthday(): string;
	get dayBirthday(): number;
}

export interface AttendProps {
	_id: string;
	fullName: string;
	dateOfBirth: string;
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
	observations: string;
	medicalInsurance: string;
	working: string;
	functionWork: string;
	activityOfInterest: string;
	preferredParticipationShift: string;

	emergencyContact: EmergencyContact;
	dataOfResponsible?: ResponsibleData;
	monthBirthday: string;
	dayBirthday: number;
}

type CreateAttend = Either<{ message: string }, Attend>;

export class Attend implements AttendProtocol {
	private constructor(private props: AttendProps) {}

	static with(props: AttendProps) {
		return new Attend(props);
	}

	static associateCategory(
		fullName: string,
		dateOfBirth: string,
		natiolity: string,
		maritalStatus: string,
		cpf: string,
		rg: string,
		address: string,
		street: string,
		city: string,
		cep: string,
		state: string,
		homePhone: string,
		cellPhone: string,
		email: string,

		currentSchool: string,
		dependents: string,
		numberOfDependents: string,
		relationOfDependents: string,
		diagnosisYear: string,
		amountOfQuimi: string,
		amountOfRad: string,
		mastologis: string,
		oncologist: string,
		hadSurgery: string,
		typeSurgery: string,
		vaccines: string,
		allergies: string,
		specialsConditions: string,
		observations: string,
		medicalInsurance: string,
		working: string,
		functionWork: string,
		activityOfInterest: string,
		preferredParticipationShift: string,

		emergencyContact: EmergencyContact,
		dataOfResponsible?: ResponsibleData
	): CreateAttend {
		const validatorAdapter = new ValidatorAdapter();
		if (!validatorAdapter.isCPF(cpf)) {
			return failure({ message: "O cpf deve ser válido" });
		}
		return success(
			new Attend({
				_id: randomUUID().toString(),
				fullName: fullName
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "")
					.toUpperCase(),
				address,
				cellPhone,
				cep,
				city,
				cpf,
				dateOfBirth,
				email,
				homePhone,
				maritalStatus,
				natiolity,
				rg,
				state,
				street,
				activityOfInterest,
				allergies,
				amountOfQuimi,
				amountOfRad,
				currentSchool: currentSchool || "Não se aplica",
				dataOfResponsible,
				dependents: dependents || "Não se aplica",
				diagnosisYear,
				emergencyContact,
				functionWork: functionWork || "Não se aplica",
				hadSurgery,
				mastologis,
				medicalInsurance: medicalInsurance || "Não se aplica",
				numberOfDependents: numberOfDependents || "Não se aplica",
				observations,
				oncologist,
				preferredParticipationShift,
				relationOfDependents: relationOfDependents || "Não se aplica",
				specialsConditions,
				typeSurgery: typeSurgery || "Não se aplica",
				vaccines,
				working,
				monthBirthday: dateOfBirth.slice(5, 7),
				dayBirthday: Number(dateOfBirth.slice(8, 10))
			})
		);
	}

    get monthBirthday(): string {
        return this.props.monthBirthday
    }
	get dayBirthday(): number {
        return this.props.dayBirthday
    }
	get address(): string {
		return this.props.address;
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
	get maritalStatus(): string {
		return this.props.maritalStatus;
	}
	get natiolity(): string {
		return this.props.natiolity;
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
	get activityOfInterest(): string {
		return this.props.activityOfInterest;
	}
	get allergies(): string {
		return this.props.allergies;
	}
	get amountOfQuimi(): string {
		return this.props.amountOfQuimi;
	}
	get amountOfRad(): string {
		return this.props.amountOfRad;
	}
	get currentSchool(): string {
		return this.props.currentSchool;
	}
	get dataOfResponsible(): ResponsibleData | undefined {
		return this.props.dataOfResponsible;
	}
	get dependents(): string {
		return this.props.dependents;
	}
	get diagnosisYear(): string {
		return this.props.diagnosisYear;
	}
	get emergencyContact(): EmergencyContact {
		return this.props.emergencyContact;
	}
	get functionWork(): string {
		return this.props.functionWork;
	}
	get hadSurgery(): string {
		return this.props.hadSurgery;
	}
	get mastologis(): string {
		return this.props.mastologis;
	}
	get medicalInsurance(): string {
		return this.props.medicalInsurance;
	}
	get numberOfDependents(): string {
		return this.props.numberOfDependents;
	}
	get observations(): string {
		return this.props.observations;
	}
	get oncologist(): string {
		return this.props.oncologist;
	}
	get preferredParticipationShift(): string {
		return this.props.preferredParticipationShift;
	}
	get relationOfDependents(): string {
		return this.props.relationOfDependents;
	}
	get specialsConditions(): string {
		return this.props.specialsConditions;
	}
	get typeSurgery(): string {
		return this.props.typeSurgery;
	}
	get vaccines(): string {
		return this.props.vaccines;
	}
	get working(): string {
		return this.props.working;
	}
	get id(): string {
		return this.props._id;
	}
}
