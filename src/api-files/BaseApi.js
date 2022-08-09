export const BaseApi = `import axiosInstance from './axios'

export class BaseApi {
    endpointPrefix = 'api';
    
    endpoint = '';

    // TODO: realise version functional

    getUrl(path) {
        let fullUrl = [ this.endpointPrefix, this.endpoint, path ]
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
