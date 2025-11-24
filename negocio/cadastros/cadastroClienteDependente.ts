import { TipoDocumento } from "../../enumeracoes/tipoDocumento";
import Entrada from "../../io/entrada";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import Endereco from "../../modelos/endereco";
import Telefone from "../../modelos/telefone";
import Armazem from "../armazem";
import Processo from "../processo";

export default class CadastroClienteDependente extends Processo {
    private entrada: Entrada;

    constructor() {
        super();
        this.entrada = new Entrada();
    }

    public processar(): void {
        console.log(`\nInício do cadastro de cliente dependente...`);

    
        let cpfTitular = this.entrada.receberTexto(`Por favor, informe o CPF do titular: `);
        
        let armazem = Armazem.getInstancia;
        let titular = armazem.getClientes.find(cliente => {
            return cliente.documentos.some(doc => doc.tipo === TipoDocumento.CPF && doc.numero === cpfTitular);
        });

        if (!titular) {
            console.log(`\nTitular não encontrado. O cadastro do dependente não pode prosseguir.`);
            return; 
        }

        console.log(`\nTitular encontrado: ${titular.nome}. Iniciando cadastro do dependente.`);

      
        let dependente = new Cliente();
        dependente.nome = this.entrada.receberTexto(`Por favor, informe o nome do dependente: `);
        dependente.nomeSocial = this.entrada.receberTexto(`Por favor, informe o nome social do dependente: `);
        dependente.dataNascimento = this.entrada.receberData(`Por favor, informe a data de nascimento do dependente`);
        dependente.dataCadastro = new Date(); 
        
        let documento = new Documento();
        documento.tipo = TipoDocumento.CPF;
        documento.numero = this.entrada.receberTexto(`Por favor, informe o CPF do dependente: `);
        documento.dataExpedicao = this.entrada.receberData(`Por favor, informe a data de expedição do CPF do dependente`);
        dependente.documentos.push(documento);

        dependente.endereco = titular.endereco.clonar() as Endereco;
        
        for (let telefone of titular.telefones) {
            dependente.telefones.push(telefone.clonar() as Telefone);
        }

        dependente.titular = titular;
        
        titular.dependentes.push(dependente); 

        armazem.getClientes.push(dependente);

        console.log(`\nCadastro de dependente concluído! 🎉`);
    }
}