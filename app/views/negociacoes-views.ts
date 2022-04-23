import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacoesView extends View<Negociacoes> {

    protected template(negociacoes: Negociacoes): string {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                    </tr>
                </thead>
                <tbody>
                    ${negociacoes.negociacoes().map(negociaca => {
                        return `
                            <tr>
                                <td>${this.dateFormat(negociaca.data)}</td>
                                <td>${negociaca.quantidade}</td>
                                <td>${negociaca.valor}</td>
                            </tr>
                        `
                    }).join('')}
                </tbody>
            </table>
        `;
    } 

    private dateFormat(date: Date): string {
        return new Intl.DateTimeFormat().format(date)
    }
}