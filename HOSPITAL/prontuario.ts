import { Paciente } from "./paciente";

export class Prontuario {
    constructor(public paciente: Paciente, public descricao: string) {}
}
