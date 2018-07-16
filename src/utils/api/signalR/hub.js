import { HubConnectionBuilder } from '@aspnet/signalr';

class Hub {
  constructor(url) {
    this.connection = new HubConnectionBuilder().withUrl(url).build();
  }

  on = (eventType, handler) => {
    this.connection.on(eventType, handler);
    return this;
  };
  off = (eventType, handler) => {
    this.connection.off(eventType, handler);
    return this;
  };

  start = () => this.connection.start();
  stop = () => this.connection.stop();
}

export default Hub;
