import { weekDays } from './../enums/week_days.js';
import { MensagemView } from './../views/mensagem-view.js';
import { NegociacoesView } from './../views/negociacoes-views.js';
import { Negociacoes } from './../models/negociacoes.js';
import { Negociacao } from './../models/negociacao.js';
import { logarTempoDeExecucao } from '../decorators/logar_tempo_execucao.js';
import { domInjector } from '../decorators/dom_injector.js';
import { NegociacoesService } from '../services/negociacoes_service.js';

export class NegociacaoController {
    @domInjector('#data')
    private _inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private _inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private _inputValor: HTMLInputElement;

    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesService: NegociacoesService = new NegociacoesService()
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView');
    private _messageView: MensagemView = new MensagemView('#mensagemView')

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @logarTempoDeExecucao()
    public add(): void {
        const negociacao: Negociacao = Negociacao.criaDe(
            this._inputData.value, 
            this._inputQuantidade.value, 
            this._inputValor.value
        )

        if (!this.ehDiaUltil(negociacao.data)) {
            return this._messageView.update("Só é possível realizar uma negociação em dias úteis!")
        }

        this._negociacoes.add(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }

    public importaDados(): void {
        this._negociacoesService.obterNegociacoesDoDia()
            .then((negociacaoDehoje: Array<Negociacao>) => {
                return negociacaoDehoje.filter(negociacaoHoje => {
                    return !this._negociacoes.negociacoes()
                        .some(negociacao => negociacao.ehIgual(negociacaoHoje))
                })
            })
            .then((negociacaoDehoje: Array<Negociacao>) => {
                for (const negociacao of negociacaoDehoje) {
                    this._negociacoes.add(negociacao)
                }
                this._negociacoesView.update(this._negociacoes)
            })
    }

    private ehDiaUltil(date: Date): boolean {
        return date.getDay() > weekDays.DOMINGO 
            && date.getDay() < weekDays.SABADO
    } 

    private atualizaView(): void {
        this._negociacoesView.update(this._negociacoes);
        this._messageView.update("Negociação adicionada com sucesso!");
    }

    private limparFormulario(): void {
        this._inputData.value = '';
        this._inputQuantidade.value = '';
        this._inputValor.value = '';
        this._inputData.focus();
    }
}