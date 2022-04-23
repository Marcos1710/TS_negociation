export function domInjector(selector: string): Function {
    return function (
        target: any,
        propertyKey: string,
    ) {

        let elemento: HTMLElement;
        const getter = function (): HTMLElement {
            if (!elemento) {
                elemento = document.querySelector(selector) as HTMLElement
                console.log(`Buscando elemento do dom com o seletor ${selector} para injetar em ${propertyKey}`)
            }

            return elemento
        }

        // Modificando o prototype da class para inseir um getter que não foi definido na class 
        Object.defineProperty(target, propertyKey, {
            get: getter
        })
    }
}