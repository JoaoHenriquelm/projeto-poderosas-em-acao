interface ValidatorProtocol {
	isCPF(cpf: string): boolean;
}

export class ValidatorAdapter implements ValidatorProtocol {
	isCPF(cpf: string): boolean {
        const regexValidatorCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
        return regexValidatorCpf.test(cpf)
    }
}
