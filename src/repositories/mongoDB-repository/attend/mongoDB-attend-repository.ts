import mongoose from "mongoose";
import { AttendRepository } from "../../attend-repository";
import { AttendSchema, IAttend } from "./mongoDB-attendSchema";
import { Attend } from "../../../entities/attend";

export class mongoDBAttend implements AttendRepository {
	private attendModel = mongoose.model<IAttend>("Attend", AttendSchema);
	async store(attend: Attend): Promise<void> {
		await this.attendModel.create({
			_id: attend.id,
			fullName: attend.fullName,
			activityOfInterest: attend.activityOfInterest,
			address: attend.address,
			allergies: attend.allergies,
			amountOfQuimi: attend.amountOfQuimi,
			amountOfRad: attend.amountOfRad,
			cellPhone: attend.cellPhone,
			cep: attend.cep,
			city: attend.city,
			cpf: attend.cpf,
			currentSchool: attend.currentSchool,
			dateOfBirth: attend.dateOfBirth,
			dayBirthday: attend.dayBirthday,
			dependents: attend.dependents,
			diagnosisYear: attend.diagnosisYear,
			email: attend.email,
			functionWork: attend.functionWork,
			hadSurgery: attend.hadSurgery,
			homePhone: attend.homePhone,
			maritalStatus: attend.maritalStatus,
			mastologis: attend.mastologis,
			medicalInsurance: attend.medicalInsurance,
			monthBirthday: attend.monthBirthday,
			natiolity: attend.natiolity,
			numberOfDependents: attend.numberOfDependents,
			observations: attend.observations,
			oncologist: attend.oncologist,
			preferredParticipationShift: attend.preferredParticipationShift,
			relationOfDependents: attend.relationOfDependents,
			rg: attend.rg,
			specialsConditions: attend.specialsConditions,
			continuousUseMedications: attend.continuousUseMedications,
			state: attend.state,
			street: attend.street,
			typeSurgery: attend.typeSurgery,
			vaccines: attend.vaccines,
			working: attend.working,
			emergencyContact: {
				name: attend.emergencyContact.name,
				kinship: attend.emergencyContact.kinship,
				phoneNumber: attend.emergencyContact.phoneNumber
			},
			dataOfResponsible: {
				address: attend.dataOfResponsible?.address,
				cellPhone: attend.dataOfResponsible?.cellPhone,
				cpf: attend.dataOfResponsible?.cpf,
				dateOfBirth: attend.dataOfResponsible?.dateOfBirth,
				email: attend.dataOfResponsible?.email,
				fullName: attend.dataOfResponsible?.fullName,
				homePhone: attend.dataOfResponsible?.homePhone,
				kinship: attend.dataOfResponsible?.kinship,
				rg: attend.dataOfResponsible?.rg
			}
		});
	}

    async attendExistByCpf(cpf: string): Promise<boolean> {
        const search = await this.attendModel.find({ cpf });
		if (search.length === 0) {
			return false;
		}
		return true;
    }

	async findAttendPerCpf(cpf: string): Promise<Attend | null> {
        const search = await this.attendModel.findOne({
			cpf
		});
		if (search === null) {
			return null;
		}
        const attend = Attend.with({
            _id: search.id,
            activityOfInterest: search.activityOfInterest,
            address: search.address,
            allergies: search.allergies,
            amountOfQuimi: search.amountOfQuimi,
            amountOfRad: search.amountOfRad,
            cellPhone: search.cellPhone,
            cep: search.cep,
            city: search.city,
            cpf: search.cpf,
            currentSchool: search.currentSchool,
            dataOfResponsible: search.dataOfResponsible,
            dateOfBirth: search.dateOfBirth,
            dayBirthday: search.dayBirthday,
            dependents: search.dependents,
            diagnosisYear: search.diagnosisYear,
            email: search.email,
            emergencyContact: search.emergencyContact,
            fullName: search.fullName,
            functionWork: search.functionWork,
            hadSurgery: search.hadSurgery,
            homePhone: search.homePhone,
            maritalStatus: search.maritalStatus,
            mastologis: search.mastologis,
            medicalInsurance: search.medicalInsurance,
            monthBirthday: search.monthBirthday,
            natiolity: search.natiolity,
            numberOfDependents: search.numberOfDependents,
            observations: search.observations,
            oncologist: search.oncologist,
            preferredParticipationShift: search.preferredParticipationShift,
            relationOfDependents: search.relationOfDependents,
            rg: search.rg,
            specialsConditions: search.specialsConditions,
			continuousUseMedications: search.continuousUseMedications,
            state: search.state,
            street: search.street,
            typeSurgery: search.typeSurgery,
            vaccines: search.vaccines,
            working: search.working
        })
        return attend
    }
}
