import api from '../api-file/api.json'
import { fromCapitalLetter, getPrefix } from './helpers'

export const getApiPathsKeys = (obj) => Object.keys(obj)
export const isNotVersionOrPrefix = (item) => !(item === 'api' || (item.includes('v') && item.length === 2))
export const trimPath = (path) => path.split('/').filter(item => isNotVersionOrPrefix(item)).join('/')
export const setFunctionName = (method, module, trimmedPath, dynamicPath) => {
    const prefix = getPrefix(method)
    let main = ''
    trimmedPath.split('/').filter(item => item !== '/').forEach(item => {
        main = main + fromCapitalLetter(item)
    })
    const postfix = dynamicPath ? 'ById' : ''
    return prefix + main + postfix
}
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
