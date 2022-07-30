import api from '../api-file/api.json'

export const getApiPathsKeys = (obj = api, key = 'paths') => Object.keys(obj[key])
export const isNotVersionOrPrefix = (item) => !(item === 'api' || (item.includes('v') && item.length === 2))
export const trimPath = (path) => path.split('/').filter(item => isNotVersionOrPrefix(item)).join('/')
export const generateApiObject = (obj = api, path) => {
    const trimmedPath = trimPath(path)
    const module = trimmedPath.split('/')[1]
    const method = Object.keys(obj[path])[0]
    return {
        path: trimmedPath,
        module,
        method
    }
}

export const getPathsForApiFiles = () => {
    const paths = getApiPathsKeys()
    const pathForApi = []

    for(let i = 0, len = paths.length; i < len; i += 1) {
        pathForApi.push(generateApiObject(paths[i]))
    }

    return pathForApi
}
