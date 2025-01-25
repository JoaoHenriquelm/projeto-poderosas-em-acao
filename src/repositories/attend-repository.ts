import { Attend } from "../entities/attend"

export interface AttendRepository {
    store(attend: Attend): Promise<void>
    attendExistByCpf(cpf: string): Promise<boolean>
    findAttendPerCpf(cpf: string): Promise<Attend | null>
}