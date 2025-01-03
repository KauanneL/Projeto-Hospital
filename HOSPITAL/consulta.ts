import { Paciente } from "./paciente";
import { Medico } from "./medico";

export class Consulta {
    constructor(
        public paciente: Paciente,
        public medico: Medico,
        public data: Date
    ) {}
}
