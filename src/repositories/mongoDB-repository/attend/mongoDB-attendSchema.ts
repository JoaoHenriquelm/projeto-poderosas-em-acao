import mongoose from "mongoose";
import {
	AttendProps,
	EmergencyContact,
	ResponsibleData
} from "../../../entities/attend";

export interface IAttend extends Document, AttendProps {}

const emergencyContact = new mongoose.Schema<EmergencyContact>({
	name: { type: String, required: true },
	kinship: { type: String, required: true },
	phoneNumber: { type: String, required: true },
},{ _id: false });

const dataOfResponsible = new mongoose.Schema<ResponsibleData>(
	{
		fullName: { type: String },
		address: { type: String },
		cellPhone: { type: String },
		cpf: { type: String },
		dateOfBirth: { type: String },
		email: { type: String },
		homePhone: { type: String },
		kinship: { type: String },
		rg: { type: String }
	},
	{ _id: false }
);

export const AttendSchema = new mongoose.Schema<IAttend>({
	_id: mongoose.Types.UUID,
	fullName: { type: String, required: true },
	dateOfBirth: { type: String, required: true },
	ageSigned: {type: String, required: true},
	natiolity: { type: String, required: true },
	maritalStatus: { type: String, required: true },
	cpf: { type: String, required: true, unique: true },
	rg: { type: String, required: true },
	address: { type: String, required: true },
	street: { type: String, required: true },
	city: { type: String, required: true },
	cep: { type: String, required: true },
	state: { type: String, required: true },
	homePhone: { type: String, required: true },
	cellPhone: { type: String, required: true },
	email: { type: String, required: true },

	currentSchool: { type: String, required: true },
	dependents: { type: String, required: true },
	numberOfDependents: { type: String, required: true },
	relationOfDependents: { type: String, required: true },
	diagnosisYear: { type: String, required: true },
	amountOfQuimi: { type: String, required: true },
	amountOfRad: { type: String, required: true },
	mastologis: { type: String, required: true },
	oncologist: { type: String, required: true },
	hadSurgery: { type: String, required: true },
	typeSurgery: { type: String, required: true },
	vaccines: { type: String, required: true },
	allergies: { type: String, required: true },
	specialsConditions: { type: String, required: true },
	continuousUseMedications: {type: String, required: true},
	observations: { type: String, required: true },
	medicalInsurance: { type: String, required: true },
	working: { type: String, required: true },
	functionWork: { type: String, required: true },
	activityOfInterest: { type: String, required: true },
	preferredParticipationShift: { type: String, required: true },
	emergencyContact: {
		type: emergencyContact,
		required: true
	},
	dataOfResponsible: { type: dataOfResponsible, required: false },

	monthBirthday: { type: String, required: true },
	dayBirthday: { type: Number, required: true }
});
