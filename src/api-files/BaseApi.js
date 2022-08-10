export const BaseApi = `import axiosInstance from './axios'

export class BaseApi {
    endpointPrefix = 'api';
    
    endpoint = '';

    constructor(version = '') {
        this.version = version;
    }

    getUrl(path) {
        let fullUrl = [ this.endpointPrefix, this.version, this.endpoint, path ]
            .filter(Boolean)
            .join('/');

        fullUrl = fullUrl.replace('//', '/');

        return fullUrl;
    }

    request(method, url, config) {
        const requestUrl = this.getUrl(url);
        const requestConfig = { ...config, method, url: requestUrl };
        return axiosInstance(requestConfig);
    }
}
`
