import mongoose from "mongoose";

export interface IAssociate {
    _id: string,
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
    monthBirthday: string
    dayBirthday: number
}

export const AssociateSchema = new mongoose.Schema<IAssociate>({
	_id: mongoose.Types.UUID,
	fullName: {type: String, required: true},
	dateOfBirth: {type: String, required: true},
	natiolity: {type: String, required: true},
	maritalStatus: {type: String, required: true},
	cpf: {type: String, required: true, unique: true},
	rg: {type: String, required: true},
	issuingBody: {type: String, required: true},
	address: {type: String, required: true},
	street: {type: String, required: true},
	city: {type: String, required: true},
	cep: {type: String, required: true},
	state: {type: String, required: true},
	homePhone: {type: String, required: true},
	cellPhone: {type: String, required: true},
	email: {type: String, required: true},
	associationCategory: {type: String, required: true},
	contribuitionAmount: {type: String, required: true},
	paymentMethod: {type: String, required: true},
	responsibleCPF: {type: String, required: true},
	responsibleName: {type: String, required: true},
    monthBirthday: {type: String, required: true},
    dayBirthday: {type: Number, required: true}
});
