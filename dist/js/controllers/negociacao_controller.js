var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { weekDays } from './../enums/week_days.js';
import { MensagemView } from './../views/mensagem-view.js';
import { NegociacoesView } from './../views/negociacoes-views.js';
import { Negociacoes } from './../models/negociacoes.js';
import { Negociacao } from './../models/negociacao.js';
import { logarTempoDeExecucao } from '../decorators/logar_tempo_execucao.js';
import { domInjector } from '../decorators/dom_injector.js';
import { NegociacoesService } from '../services/negociacoes_service.js';
export class NegociacaoController {
    constructor() {
        this._negociacoes = new Negociacoes();
        this._negociacoesService = new NegociacoesService();
        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._messageView = new MensagemView('#mensagemView');
        this._negociacoesView.update(this._negociacoes);
    }
    add() {
        const negociacao = Negociacao.criaDe(this._inputData.value, this._inputQuantidade.value, this._inputValor.value);
        if (!this.ehDiaUltil(negociacao.data)) {
            return this._messageView.update("Só é possível realizar uma negociação em dias úteis!");
        }
        this._negociacoes.add(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }
    importaDados() {
        this._negociacoesService.obterNegociacoesDoDia()
            .then((negociacaoDehoje) => {
            return negociacaoDehoje.filter(negociacaoHoje => {
                return !this._negociacoes.negociacoes()
                    .some(negociacao => negociacao.ehIgual(negociacaoHoje));
            });
        })
            .then((negociacaoDehoje) => {
            for (const negociacao of negociacaoDehoje) {
                this._negociacoes.add(negociacao);
            }
            this._negociacoesView.update(this._negociacoes);
        });
    }
    ehDiaUltil(date) {
        return date.getDay() > weekDays.DOMINGO
            && date.getDay() < weekDays.SABADO;
    }
    atualizaView() {
        this._negociacoesView.update(this._negociacoes);
        this._messageView.update("Negociação adicionada com sucesso!");
    }
    limparFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = '';
        this._inputValor.value = '';
        this._inputData.focus();
    }
}
__decorate([
    domInjector('#data')
], NegociacaoController.prototype, "_inputData", void 0);
__decorate([
    domInjector('#quantidade')
], NegociacaoController.prototype, "_inputQuantidade", void 0);
__decorate([
    domInjector('#valor')
], NegociacaoController.prototype, "_inputValor", void 0);
__decorate([
    logarTempoDeExecucao()
], NegociacaoController.prototype, "add", null);
