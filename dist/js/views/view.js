export class View {
    constructor(selector, escapar) {
        this._escapar = false;
        this._element = document.querySelector(selector);
        if (escapar) {
            this._escapar = escapar;
        }
    }
    update(model) {
        let template = this.template(model);
        if (this._escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this._element.innerHTML = template;
    }
}
