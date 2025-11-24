# Atlantis - Sistema de Gestão (ATVII) 🌊

O **Atlantis** é um sistema de gestão em linha de comando (CLI) desenvolvido para gerir clientes de parques aquáticos, clubes e hotéis. Este projeto é a evolução do MVP (Minimum Viable Product), implementando funcionalidades completas de CRUD (Create, Read, Update, Delete) e aplicando padrões de design de software robustos.

## 🚀 Funcionalidades

O sistema permite realizar as seguintes operações:

* **Cadastrar Clientes:**
    * Titulares (com dados pessoais, endereço e documentos).
    * Dependentes (vinculados a um titular, herdando endereço e telefones via prototipagem).
* **Listar Clientes:**
    * Listagem geral de todos os titulares e seus respectivos dependentes.
    * Listar dependentes de um titular específico.
    * Consultar o titular responsável por um dependente.
* **Atualizar Clientes:**
    * Alteração de Nome e Nome Social.
    * Atualização de Endereço (com propagação automática para os dependentes do titular).
    * Gestão de Telefones (Adicionar/Remover).
* **Excluir Clientes:**
    * Remoção de clientes do sistema.
    * Remoção automática de dependentes ao excluir o titular.

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Runtime:** [Node.js](https://nodejs.org/)
* **Bibliotecas:**
    * `prompt-sync`: Para entrada de dados via terminal.

## 🏗️ Padrões de Projeto (Design Patterns)

Este projeto foi construído utilizando conceitos de Orientação a Objetos e Padrões de Projeto clássicos:

1.  **Singleton (`Armazem`)**: Garante que existe apenas uma instância do "banco de dados em memória" durante toda a execução do programa.
2.  **Strategy (`Processo`)**: Utilizado para encapsular a lógica de cada operação do menu (Cadastros, Listagens, Edições) em classes separadas que seguem uma interface ou classe abstrata comum.
3.  **Prototype (`Clonar`)**: Implementado nas classes `Endereco` e `Telefone` para permitir a cópia rápida de objetos complexos, essencial para vincular os dados do dependente aos do titular.

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
* Ter o [Node.js](https://nodejs.org/) instalado na máquina.

### Passo a Passo

1.  **Instalar dependências:**
    No terminal, dentro da pasta do projeto, execute:
    ```bash
    npm install
    ```

2.  **Executar o sistema:**
    Este comando irá compilar o TypeScript e rodar o JavaScript gerado:
    ```bash
    npm start
    ```

## 📂 Estrutura do Projeto

* `/app`: Ponto de entrada da aplicação.
* `/enumeracoes`: Enums para tipos de documentos.
* `/interfaces`: Interfaces para garantir contratos (ex: Menu, Prototipo).
* `/io`: Classe utilitária para entrada de dados.
* `/menus`: Classes responsáveis pela exibição dos menus no terminal.
* `/modelos`: Classes de domínio (Cliente, Endereco, Telefone, etc.).
* `/negocio`: Lógica de negócio (Processos de cadastro, listagem, exclusão, etc.).

---
*Desenvolvido como atividade prática da disciplina de Engenharia de Software.*