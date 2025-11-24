import Entrada from "../io/entrada";
import Armazem from "./armazem";
import Processo from "./processo";

export default class ListagemDependentesPorTitular extends Processo {
    private entrada: Entrada;

    constructor() {
        super();
        this.entrada = new Entrada();
    }

    public processar(): void {
        console.log(`\n--- Listagem de Dependentes por Titular ---`);
        let nomeTitular = this.entrada.receberTexto(`Qual o nome do titular que deseja pesquisar?`);
        
        let armazem = Armazem.getInstancia;
        let clientes = armazem.getClientes;

        let titular = clientes.find(c => c.nome === nomeTitular && c.titular === undefined);

        if (!titular) {
            console.log(`Titular não encontrado!`);
            return;
        }

        console.log(`\nTitular encontrado: ${titular.nome}`);
        console.log(`Dependentes:`);
        
        if (titular.dependentes.length === 0) {
            console.log(`  (Nenhum dependente cadastrado)`);
        } else {
            titular.dependentes.forEach(dependente => {
                console.log(`  - Nome: ${dependente.nome}`);
                console.log(`    CPF: ${dependente.documentos[0].numero}`);
            });
        }
    }
}