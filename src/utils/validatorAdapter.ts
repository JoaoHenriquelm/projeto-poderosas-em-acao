interface ValidatorProtocol {
	isCPF(cpf: string): boolean;
}

export class ValidatorAdapter implements ValidatorProtocol {
	isCPF(cpf: string): boolean {
        const regexValidatorCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
        return regexValidatorCpf.test(cpf)
    }
    // associateEntityValidate(props: AssociateProps) {
    //     const validateSchema = yup.object({
    //         fullName: yup.string().required(),
    //         dateOfBirth: yup.string().required(),
    //         natiolity: yup.string().required(),
    //         maritalStatus: yup.string().required(),
    //         cpf: yup.string().required(),
    //         rg: yup.string().required(),
    //         issuingBody: yup.string().required(),
    //         address: yup.string().required(),
    //         street: yup.string().required(),
    //         city: yup.string().required(),
    //         cep: yup.string().required(),
    //         state: yup.string().required(),
    //         homePhone: yup.string().required(),
    //         cellPhone: yup.string().required(),
    //         email: yup.string().required(),
    //         associationCategory: yup.string().required(),
    //         contribuitionAmount: yup.string(),
    //         paymentMethod: yup.string(),
    //         responsibleCPF: yup.string(),
    //         responsibleName: yup.string()
    //     })
    //     return validateSchema.validate(props)
    // }
}
