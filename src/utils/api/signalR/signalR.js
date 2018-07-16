import Hub from './hub';

class SignalR {
  baseUrl = '';
  // Для каждого хаба, свое соединение
  // Положим все хабы (соединения) сюда
  hubs = new Map();
  isRunning = false;

  constructor({ baseUrl = '' }) {
    this.baseUrl = `${baseUrl}/`;
  }

  createHub(hubName) {
    if (this.hubs.has(hubName)) return this.hubs.get(hubName);

    const hub = new Hub(this.baseUrl + hubName);
    this.hubs.set(hubName, hub);
    // Если мы уже запущены, а хаб добавили потом,
    // То скажем ему запуститься
    if (this.isRunning) {
      hub.start();
    }
    return hub;
  }

  startAllHubs = () => {
    this.isRunning = true;
    const startPrommises = [];
    for (const hub of this.hubs.values()) {
      startPrommises.push(hub.start());
    }
    return Promise.all(startPrommises);
  };

  stopAllHubs = () => {
    this.isRunning = false;
    const stopPrommises = [];
    for (const hub of this.hubs.values()) {
      stopPrommises.push(hub.stop());
    }
    return Promise.all(stopPrommises);
  };

  // Не используется. Если надо будет отдельно по имени подписаться, то вот
  registerListenerOnHub = (hubName, messageType, handler) => {
    const connection = this.connections.get(hubName);
    if (!connection) throw new Error('Хаб ', hubName, ' не зарегисрирован');

    connection.on(messageType, handler);
  };
}

export default SignalR;
