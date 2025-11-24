import Entrada from "../io/entrada";
import Armazem from "./armazem";
import Processo from "./processo";

export default class ListagemTitularPorDependente extends Processo {
    private entrada: Entrada;

    constructor() {
        super();
        this.entrada = new Entrada();
    }

    public processar(): void {
        console.log(`\n--- Busca de Titular por Dependente ---`);
        let nomeDependente = this.entrada.receberTexto(`Qual o nome do dependente que deseja pesquisar?`);
        
        let armazem = Armazem.getInstancia;
        let clientes = armazem.getClientes;

        let dependente = clientes.find(c => c.nome === nomeDependente && c.titular !== undefined);

        if (!dependente) {
            console.log(`Dependente não encontrado!`);
            return;
        }

        console.log(`\nDependente encontrado: ${dependente.nome}`);
        console.log(`O titular responsável é:`);
        console.log(`  - Nome: ${dependente.titular.nome}`);
        console.log(`  - CPF: ${dependente.titular.documentos[0].numero}`);
    }
}