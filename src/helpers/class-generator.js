import { createFunctions } from './functions-creator'
import { fromCapitalLetter } from './helpers'

export const generateClass = (className, functions) => {
    return `import { BaseApi } from './BaseApi';

export class ${fromCapitalLetter(className)}Api extends BaseApi {
    endpoint = '${className}'

    ${functions.join('')}
}
    `
}

export const generateApiClasses = (file) => {
    const functions = createFunctions(file)
    const classNames = Object.keys(functions)

    const classes = []

    for(let i = 0, len = classNames.length; i < len; i += 1) {
        const className = classNames[i]
        classes.push(generateClass(className, functions[className]))
    }

    return { classes, classNames }
}
