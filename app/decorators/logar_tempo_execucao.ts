export function logarTempoDeExecucao(emSegundos: boolean = false): Function {
    // Função para gerar qualquer decorator no TypeScript 
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal: any = descriptor.value
        descriptor.value = function(...args: Array<any>) {
            let divisor = 1
            let unidade = 'milesegundos'

            if (emSegundos) {
                divisor = 1000 
                unidade = 'segundos'
            }

            const t1: number = performance.now()
            const retorno = metodoOriginal.apply(this, args)
            const t2: number = performance.now()
            console.log(`Metódo: ${propertyKey}, tempo de execução: ${(t2 - t1) / divisor} ${unidade}`)
            retorno
        }

        return descriptor
    }
}