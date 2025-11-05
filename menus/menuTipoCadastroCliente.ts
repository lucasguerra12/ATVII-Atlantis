import Menu from "../interfaces/menu";
import Entrada from "../io/entrada";
import Processo from "../negocio/processo";
import CadastroClienteTitular from "../negocio/cadastros/cadastroClienteTitular";
import CadastroClienteDependente from "../negocio/cadastros/cadastroClienteDependente";


export default class MenuTipoCadastroCliente implements Menu {
    private execucao: boolean;
    private entrada: Entrada;

    constructor() {
        this.execucao = true;
        this.entrada = new Entrada();
    }

    public mostrar(): void {
        console.log(`\nOpções de Cadastro:`);
        while (this.execucao) {
            console.log(`1 - Cadastrar Cliente Titular`);
            console.log(`2 - Cadastrar Cliente Dependente`);
            console.log(`0 - Voltar ao Menu Principal`);

            let opcao = this.entrada.receberNumero(`Por favor, escolha uma opção: `);
            let processo: Processo | undefined;

            switch (opcao) {
                case 1:
                    processo = new CadastroClienteTitular();
                    processo.processar();
                    break;
                case 2:
                    processo = new CadastroClienteDependente();
                    processo.processar();
                    break;
                case 0:
                    this.execucao = false;
                    break;
                default:
                    console.log(`\nOperação não entendida :(`);
            }
        }
    }
}