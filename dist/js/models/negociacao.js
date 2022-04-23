export class Negociacao {
    constructor(_data, _quantidade, valor) {
        this._data = _data;
        this._quantidade = _quantidade;
        this.valor = valor;
    }
    get data() {
        return this._data;
    }
    get quantidade() {
        return this._quantidade;
    }
    static criaDe(dataString, quantidade, valor) {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        return new Negociacao(date, parseInt(quantidade), parseFloat(valor));
    }
    paraTexto() {
        return `
            data: ${this._data},
            quantidade: ${this._quantidade},
            valor: ${this.valor}
        `;
    }
    ehIgual(negociacao) {
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear();
    }
}
