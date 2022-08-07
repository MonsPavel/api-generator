import { getPathsForApiFiles } from './api'

const regex = /[0-9a-zA-Z_]/g

export const createGetFunction = (apiObj) => {
    const { dynamicPath, functionName, path } = apiObj
    if(dynamicPath) {
        return`
    ${functionName}(${dynamicPath.match(regex).join('')}, params, config = {}) {
        const url = \`${path}$${dynamicPath}\`;
        return this.request('GET', url, { params, ...config });
    }
        `
    } else {
        return `
    ${functionName}(params, config = {}) {
        const url = \`${path}\`;
        return this.request('GET', url, { params, ...config });
    }
        `
    }
}

export const createPostFunction = (apiObj) => {
    const { functionName, path } = apiObj
    return `
    ${functionName}(data, config = {}) {
        const url = \`${path}\`;
        return this.request('POST', url, { data, ...config });
    }
        `
}

export const createDeleteFunction = (apiObj) => {
    const { functionName, path } = apiObj
    return `
    ${functionName}(data, config = {}) {
        const url = \`${path}\`;
        return this.request('DELETE', url, { data, ...config });
    }
    `
}

export const createPatchFunction = (apiObj) => {
    const { dynamicPath, functionName, path } = apiObj
    if(dynamicPath) {
        return `
    ${functionName}(${dynamicPath.match(regex).join('')}, data, config = {}) {
        const url = \`${path}\`;
        return this.request('PATCH', url, { data, ...config });
    }
    `
    } else {
        return `
    ${functionName}(data, config = {}) {
        const url = \`${path}\`;
        return this.request('PATCH', url, { data, ...config });
    }
        `
    }
}

export const createFunctions = () => {
    const paths = getPathsForApiFiles()
    const functions = {}
    for(let i = 0, len = paths.length; i < len; i += 1) {
        const { module, method } = paths[i]
        switch (method) {
            case 'get':
                functions[module] ? functions[module] = [...functions[module], createGetFunction(paths[i])] : functions[module] = [createGetFunction(paths[i])]
                break
            case 'post':
                functions[module] ? functions[module] = [...functions[module], createPostFunction(paths[i])] : functions[module] = [createPostFunction(paths[i])]
                break
            case 'delete':
                functions[module] ? functions[module] = [...functions[module], createDeleteFunction(paths[i])] : functions[module] = [createDeleteFunction(paths[i])]
                break
            case 'patch':
                functions[module] ? functions[module] = [...functions[module], createPatchFunction(paths[i])] : functions[module] = [createPatchFunction(paths[i])]
                break
        }
    }
    return functions
}
