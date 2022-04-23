export abstract class View<T> {
    protected _element: HTMLElement;
    private _escapar: boolean = false;

    constructor(selector: string, escapar?: boolean) {
        this._element = document.querySelector(selector) as HTMLElement;
        
        if (escapar) {
            this._escapar = escapar;
        }
    }

    protected abstract template(model: T): string;

    public update(model: T): void {
        let template = this.template(model)

        if (this._escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }

        this._element.innerHTML = template;
    }
}