import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao> {

    // aqui ele ao receber o dado no construtor já cria um atributo por de baixo dos panos
    // e já insere o valor do parametro no atributo, no caso do valor já retorna também como 
    // um metodo get devido ser publico somente leitura
    constructor(
        private _data: Date, 
        private _quantidade: number, 
        public readonly valor: number // aqui é o mesmo que ter o metodo get
    ) {
    }

    get data(): Date {
        return this._data;
    }

    get quantidade(): number {
        return this._quantidade;
    }

    public static criaDe(dataString: string, quantidade: string, valor: string): Negociacao {
        const exp: RegExp = /-/g;
        const date: Date = new Date(dataString.replace(exp, ','))

        return new Negociacao(date, parseInt(quantidade), parseFloat(valor));
    }

    public paraTexto(): string {
        return `
            data: ${this._data},
            quantidade: ${this._quantidade},
            valor: ${this.valor}
        `
    }

    public ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear()
    }
}