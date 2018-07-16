import axios from 'axios';

class Sender {
    constructor(config) {
        this.instance = axios.create(config);
    }

    getCancelToken() {
        return axios.CancelToken.source();
    }

    makeCancelable = (method, argumentsForMethod) => {
        const config = argumentsForMethod[argumentsForMethod.length - 1] || {};
        if (config.cancelToken) {
            return method(...argumentsForMethod);
        }

        const cancelManager = this.getCancelToken();
        const cancelToken = cancelManager.token;
        Object.assign(config, {cancelToken});
        const promise = method(...argumentsForMethod).catch((error) => {
            if (!axios.isCancel(error)) {
                return Promise.reject(error);
            }
            return Promise.resolve({data: {data: null, status: -1}});
        });
        promise.cancel = cancelManager.cancel;
        return promise;
    };

    get = (url, config = {}) => this.makeCancelable(this.instance.get, [url, config]);
    post = (url, data, config = {}) => this.makeCancelable(this.instance.post, [url, data, config]);
    put = (url, data, config = {}) => this.makeCancelable(this.instance.put, [url, data, config]);
    delete = (url, config = {}) => this.makeCancelable(this.instance.delete, [url, config]);

    defaultError = (error) => Promise.reject(error);
    defaultSuccess = (data) => data;
    addRequestInterceptor({ success = this.defaultSuccess, error = this.defaultError }) {
      return this.instance.interceptors.request.use(success, error);
    }
    addResponseInterceptor({ success = this.defaultSuccess, error = this.defaultError }) {
        return this.instance.interceptors.response.use(success, error);
    }
    removeResponseInterceptor(responseInterceptor) {
        this.instance.interceptors.response.eject(responseInterceptor);
    }
    removeRequestInterceptor(requestInterceptor) {
        this.instance.interceptors.request.eject(requestInterceptor);
    }
}

export default Sender;