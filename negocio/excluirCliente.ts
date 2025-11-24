import Entrada from "../io/entrada";
import Armazem from "./armazem";
import Processo from "./processo";

export default class ExcluirCliente extends Processo {
    private entrada: Entrada;

    constructor() {
        super();
        this.entrada = new Entrada();
    }

    public processar(): void {
        console.log(`\n--- Excluir Cliente ---`);
        let cpf = this.entrada.receberTexto(`Digite o CPF do cliente que deseja excluir: `);
        
        let armazem = Armazem.getInstancia;
        let clientes = armazem.getClientes;
        
        let indice = clientes.findIndex(c => c.documentos.some(doc => doc.numero === cpf));

        if (indice === -1) {
            console.log(`Cliente com CPF ${cpf} não encontrado!`);
            return;
        }

        let clienteParaRemover = clientes[indice];

        if (clienteParaRemover.titular) {
            let titular = clienteParaRemover.titular;
            let indiceNoTitular = titular.dependentes.indexOf(clienteParaRemover);
            
            if (indiceNoTitular !== -1) {
                titular.dependentes.splice(indiceNoTitular, 1);
                console.log(`(Removido da lista de dependentes do titular ${titular.nome})`);
            }
        } 
        else {
            clienteParaRemover.dependentes.forEach(dependente => {
                let indiceDep = clientes.indexOf(dependente);
                if (indiceDep !== -1) {
                    clientes.splice(indiceDep, 1);
                    console.log(`(Dependente ${dependente.nome} também foi removido)`);
                }
            });
        }

        clientes.splice(indice, 1);
        
        console.log(`Cliente ${clienteParaRemover.nome} excluído com sucesso!`);
    }
}