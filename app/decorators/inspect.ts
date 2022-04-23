export function inspect(): Function {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal: any = descriptor.value

        descriptor.value = function(...args: Array<any>) {
            console.log(`--- Método: ${propertyKey}`)
            console.log(`------ Paramêtros: ${JSON.stringify(args)}`)
            const retorno = metodoOriginal.apply(this, args)
            console.log(`------ Retorno: ${JSON.stringify(retorno)}`)
            return retorno
        }

        return descriptor
    }
}