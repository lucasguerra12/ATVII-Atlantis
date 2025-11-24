import Cliente from "../modelos/cliente";
import Armazem from "./armazem";
import Processo from "./processo";

export default class ListagemClientes extends Processo {
    public processar(): void {
        console.log(`\n--- Listagem de todos os clientes ---`);
        
        let armazem = Armazem.getInstancia;
        let clientes = armazem.getClientes;

        let titulares = clientes.filter(cliente => cliente.titular === undefined);

        if (titulares.length === 0) {
            console.log(`\nNão há clientes titulares cadastrados.`);
            return;
        }

        titulares.forEach(cliente => {
            console.log(`\nNome: ${cliente.nome}`);
            console.log(`Nome Social: ${cliente.nomeSocial}`);
            console.log(`CPF: ${cliente.documentos[0].numero}`); 
            
            console.log(`Dependentes:`);
            if (cliente.dependentes.length === 0) {
                console.log(`  (Nenhum dependente)`);
            } else {
                cliente.dependentes.forEach(dependente => {
                    console.log(`  - ${dependente.nome} (CPF: ${dependente.documentos[0].numero})`);
                });
            }
            console.log(`--------------------------------------`);
        });
    }
}