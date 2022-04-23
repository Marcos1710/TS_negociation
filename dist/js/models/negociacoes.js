export class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    add(negociacao) {
        this._negociacoes.push(negociacao);
    }
    negociacoes() {
        return this._negociacoes;
    }
    paraTexto() {
        return JSON.stringify(this._negociacoes, null, 2);
    }
    ehIgual(negociacoes) {
        return JSON.stringify(this._negociacoes) === JSON.stringify(negociacoes.negociacoes());
    }
}
