import Entrada from "../io/entrada";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
import Armazem from "./armazem";
import Processo from "./processo";

export default class AtualizarCliente extends Processo {
    private entrada: Entrada;

    constructor() {
        super();
        this.entrada = new Entrada();
    }

    public processar(): void {
        console.log(`\n--- Atualizar Cliente ---`);
        let cpf = this.entrada.receberTexto(`Digite o CPF do cliente que deseja atualizar: `);
        
        let armazem = Armazem.getInstancia;
        let cliente = armazem.getClientes.find(c => c.documentos.some(doc => doc.numero === cpf));

        if (!cliente) {
            console.log(`Cliente com CPF ${cpf} não encontrado!`);
            return;
        }

        let executando = true;
        while (executando) {
            console.log(`\n--- Atualizando: ${cliente.nome} ---`);
            console.log(`1 - Nome`);
            console.log(`2 - Nome Social`);
            console.log(`3 - Endereço (Atualiza também o dos dependentes)`);
            console.log(`4 - Adicionar Telefone`);
            console.log(`5 - Remover Telefone`);
            console.log(`0 - Finalizar atualização`);

            let opcao = this.entrada.receberNumero(`Escolha uma opção: `);

            switch (opcao) {
                case 1:
                    cliente.nome = this.entrada.receberTexto(`Novo nome: `);
                    console.log(`Nome atualizado!`);
                    break;
                case 2:
                    cliente.nomeSocial = this.entrada.receberTexto(`Novo nome social: `);
                    console.log(`Nome social atualizado!`);
                    break;
                case 3:
                    this.atualizarEndereco(cliente);
                    break;
                case 4:
                    let ddd = this.entrada.receberTexto(`DDD: `);
                    let numero = this.entrada.receberTexto(`Número: `);
                    let novoTel = new Telefone();
                    novoTel.ddd = ddd;
                    novoTel.numero = numero;
                    cliente.telefones.push(novoTel);
                    console.log(`Telefone adicionado!`);
                    break;
                case 5:
                    this.removerTelefone(cliente);
                    break;
                case 0:
                    executando = false;
                    break;
                default:
                    console.log(`Opção inválida.`);
            }
        }
    }

    private atualizarEndereco(cliente: Cliente): void {
        console.log(`\n--- Atualizando Endereço ---`);
        let novoEndereco = new Endereco();
        novoEndereco.rua = this.entrada.receberTexto(`Rua: `);
        novoEndereco.bairro = this.entrada.receberTexto(`Bairro: `);
        novoEndereco.cidade = this.entrada.receberTexto(`Cidade: `);
        novoEndereco.estado = this.entrada.receberTexto(`Estado: `);
        novoEndereco.pais = this.entrada.receberTexto(`País: `);
        novoEndereco.codigoPostal = this.entrada.receberTexto(`CEP: `);
        cliente.endereco = novoEndereco;

        // Regra de Negócio: Propagar para os dependentes
        if (cliente.dependentes.length > 0) {
            cliente.dependentes.forEach(dep => {
                dep.endereco = novoEndereco.clonar() as Endereco;
            });
            console.log(`Endereço atualizado para o titular e seus ${cliente.dependentes.length} dependentes!`);
        } else {
            console.log(`Endereço atualizado!`);
        }
    }

    private removerTelefone(cliente: Cliente): void {
        console.log(`\n--- Telefones Atuais ---`);
        cliente.telefones.forEach((tel, index) => {
            console.log(`${index} - (${tel.ddd}) ${tel.numero}`);
        });

        let index = this.entrada.receberNumero(`Digite o índice do telefone para remover: `);
        
        if (index >= 0 && index < cliente.telefones.length) {
            cliente.telefones.splice(index, 1);
            console.log(`Telefone removido!`);
        } else {
            console.log(`Índice inválido.`);
        }
    }
}