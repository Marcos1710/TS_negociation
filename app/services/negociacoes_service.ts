import { negociacoesDoDia } from '../interfaces/negociaca_do_dia.js';
import { Negociacao } from './../models/negociacao.js';


export class NegociacoesService {
    public obterNegociacoesDoDia(): Promise<Array<Negociacao>> {
        return fetch('http://localhost:8080/dados')
        .then((response: Response) => response.json())
        .then((dados: Array<negociacoesDoDia>) => {
            return dados.map(dado => {
                return new Negociacao(new Date(), dado.vezes, dado.montante)
            })
        })
    }
}