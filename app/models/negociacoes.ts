import { Modelo } from './../interfaces/modelo.js';
import { Negociacao } from './negociacao.js';

export class Negociacoes implements Modelo<Negociacoes> {
    private _negociacoes: Array<Negociacao> = []

    public add(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao)
    }

    public negociacoes(): ReadonlyArray<Negociacao> {
        return this._negociacoes;
    }

    public paraTexto(): string {
        return JSON.stringify(this._negociacoes, null, 2)
    }

    public ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) === JSON.stringify(negociacoes.negociacoes())
    }
}