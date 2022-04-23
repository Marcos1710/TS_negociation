import { View } from "./view.js";
export class NegociacoesView extends View {
    template(negociacoes) {
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
                        `;
        }).join('')}
                </tbody>
            </table>
        `;
    }
    dateFormat(date) {
        return new Intl.DateTimeFormat().format(date);
    }
}
