import Cliente from "../modelos/cliente";

export default class Armazem {
    private static instanciaUnica: Armazem = new Armazem();

    private clientes: Cliente[] = [];

    private constructor() {}

    public static get getInstancia() {
        return this.instanciaUnica;
    }


    public get getClientes() {
        return this.clientes;
    }
}