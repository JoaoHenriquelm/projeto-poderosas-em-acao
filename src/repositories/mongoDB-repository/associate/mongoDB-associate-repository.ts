import mongoose from "mongoose";
import { Associate } from "../../../entities/associate";
import { AssociateRepository } from "../../associate-repository";
import { AssociateSchema, IAssociate } from "./mongoDB-associateSchema";

export class mongoDBAssociate implements AssociateRepository {
	private associateModel = mongoose.model<IAssociate>(
		"Associate",
		AssociateSchema
	);
	async store(associate: Associate): Promise<void> {
		await this.associateModel.create({
			_id: associate.id,
			fullName: associate.fullName,
			dateOfBirth: associate.dateOfBirth,
			natiolity: associate.natiolity,
			maritalStatus: associate.maritalStatus,
			cpf: associate.cpf,
			rg: associate.rg,
			issuingBody: associate.issuingBody,
			address: associate.address,
			street: associate.street,
			city: associate.city,
			cep: associate.cep,
			state: associate.state,
			homePhone: associate.homePhone,
			cellPhone: associate.cellPhone,
			email: associate.email,
			associationCategory: associate.associationCategory,
			contribuitionAmount: associate.contribuitionAmount,
			paymentMethod: associate.paymentMethod,
			responsibleCPF: associate.responsibleCPF,
			responsibleName: associate.responsibleName,
			dayBirthday: associate.dayBirthday,
			monthBirthday: associate.monthBirthday
		});
	}

	async associateExistByCpf(cpf: string): Promise<boolean> {
		const search = await this.associateModel.find({ cpf });
		if (search.length === 0) {
			return false;
		}
		return true;
	}

	async findAssociatePerCpf(cpf: string): Promise<Associate | null> {
		const search = await this.associateModel.findOne({
			cpf
		});
		if (search === null) {
			return null;
		}

		const associate = Associate.with({
			_id: search.id,
			address: search.address,
			associationCategory: search.associationCategory,
			cellPhone: search.cellPhone,
			cep: search.cep,
			city: search.city,
			contribuitionAmount: search.contribuitionAmount,
			cpf: search.cpf,
			dateOfBirth: search.dateOfBirth,
			email: search.email,
			fullName: search.fullName,
			homePhone: search.homePhone,
			issuingBody: search.issuingBody,
			maritalStatus: search.maritalStatus,
			natiolity: search.natiolity,
			paymentMethod: search.paymentMethod,
			responsibleCPF: search.responsibleCPF,
			responsibleName: search.responsibleName,
			rg: search.rg,
			state: search.state,
			street: search.street,
			monthBirthday: search.monthBirthday,
			dayBirthday: search.dayBirthday
		});
		return associate;
	}

	async findAssociatesPerName(name: string): Promise<Array<Associate>> {
		const nameNormalized = name
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toUpperCase();
		const filter = {
			fullName: {
				$regex: `^${nameNormalized}`,
				$options: "i"
			}
		};
		const search = await this.associateModel.find(filter);

		const associateList = search.map((s) => {
			const associate = Associate.with({
				_id: s.id,
				address: s.address,
				associationCategory: s.associationCategory,
				cellPhone: s.cellPhone,
				cep: s.cep,
				city: s.city,
				contribuitionAmount: s.contribuitionAmount,
				cpf: s.cpf,
				dateOfBirth: s.dateOfBirth,
				email: s.email,
				fullName: s.fullName,
				homePhone: s.homePhone,
				issuingBody: s.issuingBody,
				maritalStatus: s.maritalStatus,
				natiolity: s.natiolity,
				paymentMethod: s.paymentMethod,
				responsibleCPF: s.responsibleCPF,
				responsibleName: s.responsibleName,
				rg: s.rg,
				state: s.state,
				street: s.street,
				monthBirthday: s.monthBirthday,
				dayBirthday: s.dayBirthday
			});
			return associate;
		});
		return associateList;
	}

	async findAssociatesPerBirthdayMonth(
		currentMonthString: string
	): Promise<Array<Associate>> {
		const search = await this.associateModel
			.find({ monthBirthday: currentMonthString })
			.sort({ dayBirthday: 1 });

		const associateList = search.map((s) => {
			const associate = Associate.with({
				_id: s.id,
				address: s.address,
				associationCategory: s.associationCategory,
				cellPhone: s.cellPhone,
				cep: s.cep,
				city: s.city,
				contribuitionAmount: s.contribuitionAmount,
				cpf: s.cpf,
				dateOfBirth: s.dateOfBirth,
				email: s.email,
				fullName: s.fullName,
				homePhone: s.homePhone,
				issuingBody: s.issuingBody,
				maritalStatus: s.maritalStatus,
				natiolity: s.natiolity,
				paymentMethod: s.paymentMethod,
				responsibleCPF: s.responsibleCPF,
				responsibleName: s.responsibleName,
				rg: s.rg,
				state: s.state,
				street: s.street,
				monthBirthday: s.monthBirthday,
				dayBirthday: s.dayBirthday
			});
			return associate;
		});
		return associateList;
	}

	async findAssociatesPerLimit(
		limit: number,
		page: number
	): Promise<Array<Associate>> {
		const skip = (page - 1) * limit;
		const search = await this.associateModel.find().skip(skip).limit(limit);

		const associateList = search.map((s) => {
			const associate = Associate.with({
				_id: s.id,
				address: s.address,
				associationCategory: s.associationCategory,
				cellPhone: s.cellPhone,
				cep: s.cep,
				city: s.city,
				contribuitionAmount: s.contribuitionAmount,
				cpf: s.cpf,
				dateOfBirth: s.dateOfBirth,
				email: s.email,
				fullName: s.fullName,
				homePhone: s.homePhone,
				issuingBody: s.issuingBody,
				maritalStatus: s.maritalStatus,
				natiolity: s.natiolity,
				paymentMethod: s.paymentMethod,
				responsibleCPF: s.responsibleCPF,
				responsibleName: s.responsibleName,
				rg: s.rg,
				state: s.state,
				street: s.street,
				monthBirthday: s.monthBirthday,
				dayBirthday: s.dayBirthday
			});
			return associate;
		});
		return associateList;
	}

	async getNumberOfPages(limit: number): Promise<number> {
		const totalDocuments = await this.associateModel.countDocuments();
		const totalPages = Math.ceil(totalDocuments / limit);
		return totalPages;
	}

	async getNumberOfPagesContributors(limit: number): Promise<number> {
		const totalDocuments = await this.associateModel.countDocuments({associationCategory: "Sócio Contribuinte"});
		const totalPages = Math.ceil(totalDocuments / limit);
		return totalPages;
	}

	async findContributorsOrderByContribuitionAmountPerLimit(limit: number, page: number): Promise<Array<Associate>> {
		const skip = (page - 1) * limit;
		const search = await this.associateModel.find({ associationCategory: "Sócio Contribuinte" }).skip(skip).limit(limit)
		const associateList = search.map((s) => {
			const associate = Associate.with({
				_id: s.id,
				address: s.address,
				associationCategory: s.associationCategory,
				cellPhone: s.cellPhone,
				cep: s.cep,
				city: s.city,
				contribuitionAmount: s.contribuitionAmount,
				cpf: s.cpf,
				dateOfBirth: s.dateOfBirth,
				email: s.email,
				fullName: s.fullName,
				homePhone: s.homePhone,
				issuingBody: s.issuingBody,
				maritalStatus: s.maritalStatus,
				natiolity: s.natiolity,
				paymentMethod: s.paymentMethod,
				responsibleCPF: s.responsibleCPF,
				responsibleName: s.responsibleName,
				rg: s.rg,
				state: s.state,
				street: s.street,
				monthBirthday: s.monthBirthday,
				dayBirthday: s.dayBirthday
			});
			return associate;
		});
		return associateList;
	}
}
