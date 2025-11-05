import { TipoDocumento } from "../../enumeracoes/tipoDocumento";
import Entrada from "../../io/entrada";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import Endereco from "../../modelos/endereco";
import Telefone from "../../modelos/telefone";
import Armazem from "../armazem";
import Processo from "../processo";

export default class CadastroClienteTitular extends Processo {
    private entrada: Entrada;

    constructor() {
        super();
        this.entrada = new Entrada();
    }

    public processar(): void {
        console.log(`\nInício do cadastro de cliente titular...`);
        let cliente = new Cliente();
        
        // --- Obter Dados Básicos ---
        cliente.nome = this.entrada.receberTexto(`Por favor, informe o nome do cliente: `);
        cliente.nomeSocial = this.entrada.receberTexto(`Por favor, informe o nome social: `);
        cliente.dataNascimento = this.entrada.receberData(`Por favor, informe a data de nascimento`);
        cliente.dataCadastro = new Date(); 

        // --- Obter Documento (CPF) ---
        let documento = new Documento();
        documento.tipo = TipoDocumento.CPF; 
        documento.numero = this.entrada.receberTexto(`Por favor, informe o número do CPF: `);
        documento.dataExpedicao = this.entrada.receberData(`Por favor, informe a data de expedição do CPF`);
        cliente.documentos.push(documento); 

        // --- Obter Endereço ---
        let endereco = new Endereco();
        endereco.rua = this.entrada.receberTexto(`Por favor, informe a rua: `);
        endereco.bairro = this.entrada.receberTexto(`Por favor, informe o bairro: `);
        endereco.cidade = this.entrada.receberTexto(`Por favor, informe a cidade: `);
        endereco.estado = this.entrada.receberTexto(`Por favor, informe o estado: `);
        endereco.pais = this.entrada.receberTexto(`Por favor, informe o país: `);
        endereco.codigoPostal = this.entrada.receberTexto(`Por favor, informe o CEP: `);
        cliente.endereco = endereco; 

        
        let continuar = true;
        while (continuar) {
            let ddd = this.entrada.receberTexto(`Por favor, informe o DDD: `);
            let numero = this.entrada.receberTexto(`Por favor, informe o número do telefone: `);
            let telefone = new Telefone();
            telefone.ddd = ddd;
            telefone.numero = numero;
            cliente.telefones.push(telefone);

            let opcao = this.entrada.receberTexto(`Deseja adicionar outro telefone? (S/N): `);
            if (opcao.toLowerCase() !== 's') {
                continuar = false;
            }
        }

        let armazem = Armazem.getInstancia;
        armazem.getClientes.push(cliente);

        console.log(`\nCadastro de titular concluído! 🎉`);
    }
}