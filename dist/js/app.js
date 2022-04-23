import { NegociacaoController } from './controllers/negociacao_controller.js';
const negociacaoController = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        negociacaoController.add();
    });
}
else {
    throw Error('Não foi possível iniciar a aplicação.');
}
const botaoImporta = document.querySelector("#botao-importa");
if (botaoImporta) {
    botaoImporta.addEventListener('click', () => {
        negociacaoController.importaDados();
    });
}
else {
    throw Error('Botão importar não encontrado.');
}
