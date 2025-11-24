import Menu from "../interfaces/menu";
import Entrada from "../io/entrada";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemDependentesPorTitular from "../negocio/listagemDependentesPorTitular";
import Processo from "../negocio/processo";
import ListagemTitularPorDependente from "../negocio/listagemTitularPorDependente";

export default class MenuTipoListagemClientes implements Menu {
    private entrada: Entrada;
    private execucao: boolean;

    constructor() {
        this.entrada = new Entrada();
        this.execucao = true;
    }

    public mostrar(): void {
        while (this.execucao) {
            console.log(`\nOpções de Listagem:`);
            console.log(`1 - Listar todos os clientes (Titulares e Dependentes)`);
            console.log(`2 - Listar dependentes de um titular específico (Não implementado)`);
            console.log(`3 - Listar titular de um dependente específico (Não implementado)`);
            console.log(`0 - Voltar ao menu principal`);

            let opcao = this.entrada.receberNumero(`Por favor, escolha uma opção: `);
            let processo: Processo;

            switch (opcao) {
                case 1:
                    processo = new ListagemClientes();
                    processo.processar();
                    break;
                case 2:
                    processo = new ListagemDependentesPorTitular();
                    processo.processar();
                    break;
                case 3:
                    processo = new ListagemTitularPorDependente();
                    processo.processar();
                    break;
                case 0:
                    this.execucao = false;
                    break;
                default:
                    console.log(`\nOpção inválida!`);
            }
        }
    }
}