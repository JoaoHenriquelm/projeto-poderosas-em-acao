import { Request, Response } from "express";
import {
	CreateAssociate,
	CreateAssociateRequest,
    CreateAssociateResponse
} from "../../../../usecases/create-associate";
import { HttpMethod, Route } from "../route";
export type CreateAssociateResponseHandler = {
    message: string
} | {
    
}

export type CreateAssociateRequestHandler = CreateAssociateRequest;

export class CreateAssociateRoute implements Route {
	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		private readonly createAssociateService: CreateAssociate
	) {}

	static create(createAssociateService: CreateAssociate) {
		return new CreateAssociateRoute(
			"/associate",
			HttpMethod.POST,
			createAssociateService
		);
	}
	getPath(): string {
		return this.path;
	}
	getMethod(): HttpMethod {
		return this.method;
	}

	getHandler(): (request: Request, response: Response) => Promise<void> {
		return async (request: Request, response: Response) => {
			const {
				fullName,
				dateOfBirth,
				cpf,
				address,
				associationCategory,
				cellPhone,
				cep,
				city,
				contribuitionAmount,
				email,
				homePhone,
				issuingBody,
				maritalStatus,
				natiolity,
				paymentMethod,
				responsibleCPF,
				responsibleName,
				rg,
				state,
				street
			}: CreateAssociateRequestHandler = request.body;

			const input: CreateAssociateRequestHandler = {
				fullName,
				dateOfBirth,
				cpf,
				address,
				associationCategory,
				cellPhone,
				cep,
				city,
				contribuitionAmount,
				email,
				homePhone,
				issuingBody,
				maritalStatus,
				natiolity,
				paymentMethod,
				responsibleCPF,
				responsibleName,
				rg,
				state,
				street
			};

            const output = await this.createAssociateService.execute(input)
            
            const responseBody = this.present(output)
            
            response.status(output.isRight()? 200 : 400).send(responseBody)
		};
	}

	private present(
		input: CreateAssociateResponse
	): CreateAssociateResponseHandler {
		if(input.isRight()) {
            return input.value
        } else {
            return input.reason
        }
	}
}
