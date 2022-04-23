import { Imprimivel } from "./imprimivel.js";

export function imprimir(...objetos: Array<Imprimivel>): void {
    for (const objeto of objetos) {
        console.log(objeto.paraTexto())
    }
}