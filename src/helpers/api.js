import api from '../api-file/api.json'

export const getApiPathsKeys = (obj) => Object.keys(obj)
export const isNotVersionOrPrefix = (item) => !(item === 'api' || (item.includes('v') && item.length === 2))
export const trimPath = (path) => path.split('/').filter(item => isNotVersionOrPrefix(item)).join('/')
// TODO: improve function name function
export const setFunctionName = (method, module) => `${method}${module}`
export const getDynamicPath = (path) => {
    const from = path.search('{')
    const to = path.length
    if(~from) return path.slice(from, to)
    return ''
}

export const generateApiObject = (obj, path) => {
    const dynamicPath = getDynamicPath(path)
    const trimmedPath = trimPath(path).replace(dynamicPath, '')
    const module = trimmedPath.split('/')[1]
    const method = Object.keys(obj[path])[0]
    return {
        functionName: setFunctionName(method, module, trimmedPath),
        path: trimmedPath,
        dynamicPath,
        module,
        method
    }
}

export const getPathsForApiFiles = (obj = api.paths) => {
    const paths = getApiPathsKeys(obj)
    const pathForApi = []

    for(let i = 0, len = paths.length; i < len; i += 1) {
        pathForApi.push(generateApiObject(obj, paths[i]))
    }

    return pathForApi
}
