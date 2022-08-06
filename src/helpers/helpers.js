export const fromCapitalLetter = (word) => word.slice(0, 1).toUpperCase() + word.slice(1, word.length)

export const getPrefix = (method) => {
    const prefixes = {
        get: 'get',
        post: 'add',
        patch: 'update',
        delete: 'delete',
        default: ''
    }

    return prefixes[method] || prefixes.default
}
