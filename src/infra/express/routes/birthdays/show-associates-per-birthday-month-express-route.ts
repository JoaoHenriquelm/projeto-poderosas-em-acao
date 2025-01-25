import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { Associate } from "../../../../entities/associate";
import { ShowAssociatesPerBirthdayMonth, ShowAssociatesPerBirthdayMonthResponse } from "../../../../usecases/show-associates-per-birthdaymonth";

type ShowAssociatesPerBirthDayOutput = {
    cpf: string
    fullName: string,
    dateOfBirth: string,
    homePhone: string,
    cellPhone: string,
    address: string,
    email: string
}

export type ShowAssociatesPerBirthdayMonthResponseHandler = {
    value: Array<Associate>, message: string
} | Array<ShowAssociatesPerBirthDayOutput>


export class ShowAssociatesPerBirthdayMonthRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly showAssociatesPerBirthdayMonthService: ShowAssociatesPerBirthdayMonth
    ) {}

    static show(showAssociatesPerBirthdayMonthService: ShowAssociatesPerBirthdayMonth) {
        return new ShowAssociatesPerBirthdayMonthRoute(
            "/birthdays/",
            HttpMethod.GET,
            showAssociatesPerBirthdayMonthService
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
            const output = await this.showAssociatesPerBirthdayMonthService.execute()
            
            const responseBody = this.present(output)
            
            response.status(output.isRight()? 200 : 400).send(responseBody)
        };
    }

    private present(
        input: ShowAssociatesPerBirthdayMonthResponse
    ): ShowAssociatesPerBirthdayMonthResponseHandler {
        if(input.isRight()) {
            const associates = input.value
            const associatesOutput: Array<ShowAssociatesPerBirthDayOutput> = associates.map((associate) => {
                return {
                    cpf: associate.cpf,
                    fullName: associate.fullName,
                    dateOfBirth: associate.dateOfBirth,
                    homePhone: associate.homePhone,
                    cellPhone: associate.cellPhone,
                    address: associate.address,
                    email: associate.email
                }
            })
            return associatesOutput
        } else {
            return input.reason
        }
    }
}
