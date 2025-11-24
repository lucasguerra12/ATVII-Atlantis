import Menu from "../interfaces/menu";
import Entrada from "../io/entrada";
import AtualizarCliente from "../negocio/atualizarCliente";
import MenuTipoCadastroCliente from "./menuTipoCadastroCliente";
import MenuTipoListagemClientes from "./menuTipoListagemClientes"; 
import ExcluirCliente from "../negocio/excluirCliente";

export default class MenuPrincipal implements Menu {
    private entrada: Entrada;
    private execucao: boolean;

    constructor() {
        this.entrada = new Entrada();
        this.execucao = true;
    }

    public mostrar(): void {
        console.log(`\nAtlantis - Sistema de Gestão`);

        while (this.execucao) {
            console.log(`\nOpções Principais:`);
            console.log(`1 - Cadastrar Cliente`);
            console.log(`2 - Listar Clientes`); 
            console.log(`3 - Atualizar Cliente`);
            console.log(`4 - Excluir Cliente`);
            console.log(`0 - Sair`);

            let opcao = this.entrada.receberNumero(`Por favor, escolha uma opção: `);

            switch (opcao) {
                case 1:
                    const menuCadastro = new MenuTipoCadastroCliente();
                    menuCadastro.mostrar();
                    break;
                case 2:
                    const menuListagem = new MenuTipoListagemClientes();
                    menuListagem.mostrar();
                    break;
                case 3:
                    const processoAtualizar = new AtualizarCliente();
                    processoAtualizar.processar();
                    break;
                case 4:
                    const processoExcluir = new ExcluirCliente();
                    processoExcluir.processar();
                    break;
                case 0:
                    this.execucao = false;
                    console.log(`\nAté mais!`);
                    break;
                default:
                    console.log(`\nOperação não entendida :(`);
            }
        }
    }
}