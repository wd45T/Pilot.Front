import Sender from './sender';
import SignalR from './signalR/signalR';
import Emitter from '../emitter';
import apiConfig from './api-config';
import signalConfigure from './signalR/configure';

function buildByHostname(ip, port) {
    const url = `http://${ip}:${port}`;
    return {
        apiUrl: `${url}/api`,
        signalRUrl: url
    };
}

let urls = null;
// eslint-disable-next-line no-undef
if (BUILD_TYPE === 'local') {
    urls = buildByHostname('localhost', 5000);
    // eslint-disable-next-line no-undef
} else if (BUILD_TYPE === 'test') {
    urls = buildByHostname('87.249.16.100', 8000);
    // eslint-disable-next-line no-undef
} else if (BUILD_TYPE === 'dev') {
    urls = buildByHostname('192.168.1.202', 888);
} else if (BUILD_TYPE === 'prod') {
    urls = buildByHostname('uhf.ttpcenter.ru', 8000);
}

const { apiUrl, signalRUrl } = urls;
class ApiClient {
    constructor(methodBuilder) {
        this.emitter = new Emitter();

        // Сконфигурируем отправителя запросов
        this.sender = new Sender({
            baseURL: apiUrl,
            headers: {
                'Cache-control': 'no-store, no-cache',
                Pragma: 'no-cache',
                Expires: 0
            }
        });

        // Сконфигурируем signalR
        this.signalR = new SignalR({
            baseUrl: signalRUrl
        });

        // Здесь будет лежат ссылка на токен авторизации
        this.token = null;

        // Перехватчик всех реквестов
        // Добавим в заголовок каждого реквеста токен авторизации
        this.sender.addRequestInterceptor({
            success: (request) => {
                if (this.token) {
                    request.headers.token = this.token; // eslint-disable-line no-param-reassign
                }
                return request;
            }
        });

        // Добавим методы api
        const apiMethods = methodBuilder(this.sender);
        Object.assign(this, apiMethods);

        // Подпишем наш EventEmitter на события с signalR
        // signalConfigure(this.signalR, this.emitter);
    }

    setToken(token) {
        this.token = token;
    }
    resetToken() {
        this.token = null;
    }

    on(eventType, callback) {
        return this.emitter.addListener(eventType, callback);
    }
    off(eventType, callback) {
        return this.emitter.removeListener(eventType, callback);
    }

    startSignalR() {
        return this.signalR.startAllHubs();
    }
    stopSignalR() {
        return this.signalR.stopAllHubs();
    }
}
export { ApiClient };
export default new ApiClient(apiConfig);
