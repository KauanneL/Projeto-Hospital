import { Paciente } from "./paciente";
import { Medico } from "./medico";
import { Consulta } from "./consulta";
import { Prontuario } from "./prontuario";
import { Sala } from "./lugar";

// Arrays para armazenar os dados
let pacientes: Paciente[] = [];
let medicos: Medico[] = [];
let consultas: Consulta[] = [];
let prontuarios: Prontuario[] = [];
let salas: Sala[] = [
    new Sala("Sala 1", "livre"),
    new Sala("Sala 2", "livre"),
    new Sala("Sala 3", "ocupada"),
];

// Funções para interação com o sistema

// Função para agendar uma consulta
function agendarConsulta(pacienteNome: string, medicoNome: string, data: string) {
    const paciente = new Paciente(pacienteNome);
    const medico = new Medico(medicoNome);
    const consulta = new Consulta(paciente, medico, new Date(data));
    consultas.push(consulta);
    atualizarConsultasList();
}

// Função para atualizar o prontuário de um paciente
function atualizarProntuario(pacienteNome: string, descricao: string) {
    const paciente = new Paciente(pacienteNome);
    const prontuario = new Prontuario(paciente, descricao);
    prontuarios.push(prontuario);
}

// Função para atualizar a ocupação da sala (sem usar find)
function atualizarOcupacaoSala(salaNome: string, ocupacao: "livre" | "ocupada") {
    let salaEncontrada: Sala | undefined = undefined;

    // Percorre todas as salas e encontra a sala com o nome correspondente
    for (let i = 0; i < salas.length; i++) {
        if (salas[i].nome === salaNome) {
            salaEncontrada = salas[i];
            break; // Sai do loop quando a sala é encontrada
        }
    }

    // Verifica se a sala foi encontrada
    if (salaEncontrada) {
        salaEncontrada.ocupacao = ocupacao;  // Atualiza a ocupação
        console.log(`Ocupação da ${salaEncontrada.nome} atualizada para: ${ocupacao}`);
    } else {
        console.error(`Sala com nome "${salaNome}" não encontrada.`);
    }
}

// Função para atualizar a lista de consultas na interface
function atualizarConsultasList() {
    const consultasList = document.getElementById("consultasList");
    if (consultasList) {
        consultasList.innerHTML = "";
        consultas.forEach((consulta) => {
            const li = document.createElement("li");
            li.textContent = `${consulta.paciente.nome} com Dr. ${consulta.medico.nome} em ${consulta.data.toLocaleString()}`;
            consultasList.appendChild(li);
        });
    }
}

// Interação com os formulários do HTML
document.getElementById("agendarConsultaForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const pacienteNome = (document.getElementById("paciente") as HTMLInputElement).value;
    const medicoNome = (document.getElementById("medico") as HTMLInputElement).value;
    const data = (document.getElementById("data") as HTMLInputElement).value;
    agendarConsulta(pacienteNome, medicoNome, data);
});

document.getElementById("atualizarProntuarioForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const pacienteNome = (document.getElementById("pacienteProntuario") as HTMLInputElement).value;
    const descricao = (document.getElementById("descricao") as HTMLTextAreaElement).value;
    atualizarProntuario(pacienteNome, descricao);
});

document.getElementById("gerenciarSalaForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const salaNome = (document.getElementById("sala") as HTMLInputElement).value;
    const ocupacao = (document.getElementById("ocupacao") as HTMLSelectElement).value as "livre" | "ocupada";
    atualizarOcupacaoSala(salaNome, ocupacao);
});

