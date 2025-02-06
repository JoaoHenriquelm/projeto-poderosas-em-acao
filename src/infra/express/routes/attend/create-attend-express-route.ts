import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CreateAttend, CreateAttendRequest, CreateAttendResponse } from "../../../../usecases/create-attend";
export type CreateAttendResponseHandler = {
    message: string
} | {
    id: string
}

export type CreateAttendRequestHandler = CreateAttendRequest;

export class CreateAttendRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createAttendService: CreateAttend
    ) {}

    static create(createAttendService: CreateAttend) {
        return new CreateAttendRoute(
            "/attend",
            HttpMethod.POST,
            createAttendService
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
                activityOfInterest,
                ageSigned,
                address,
                allergies,
                amountOfQuimi,
                amountOfRad,
                cellPhone,
                cep,
                city,
                cpf,
                currentSchool,
                dateOfBirth,
                dependents,
                diagnosisYear,
                email,
                emergencyContact,
                fullName,
                functionWork,
                hadSurgery,
                homePhone,
                maritalStatus,
                mastologis,
                medicalInsurance,
                natiolity,
                numberOfDependents,
                observations,
                oncologist,
                preferredParticipationShift,
                relationOfDependents,
                rg,
                specialsConditions,
                continuousUseMedications,
                state,
                street,
                typeSurgery,
                vaccines,
                working,
                dataOfResponsible
            }: CreateAttendRequestHandler = request.body;

            const input: CreateAttendRequestHandler = {
                fullName,
                dateOfBirth,
                ageSigned,
                cpf,
                address,
                activityOfInterest,
                cellPhone,
                cep,
                city,
                allergies,
                email,
                homePhone,
                amountOfQuimi,
                maritalStatus,
                natiolity,
                amountOfRad,
                currentSchool,
                dependents,
                rg,
                state,
                street,
                diagnosisYear,
                emergencyContact,
                functionWork,
                hadSurgery,
                mastologis,
                medicalInsurance,
                numberOfDependents,
                observations,
                oncologist,
                preferredParticipationShift,
                relationOfDependents,
                specialsConditions,
                continuousUseMedications,
                typeSurgery,
                vaccines,
                working,
                dataOfResponsible
            };

            const output = await this.createAttendService.execute(input)
            
            const responseBody = this.present(output)
            
            response.status(output.isRight()? 200 : 400).send(responseBody)
        };
    }

    private present(
        input: CreateAttendResponse
    ): CreateAttendResponseHandler {
        if(input.isRight()) {
            return input.value
        } else {
            return input.reason
        }
    }
}
