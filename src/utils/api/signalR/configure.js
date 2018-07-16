export default (signalR, emitter) => {
    // Создание хабов
    const telemetryHub = signalR.createHub('TelemetryHub');

    // Подписываемся на события
    telemetryHub.on('TelemetryChanged', (data) => {
        emitter.emit('telemetryChanged', data);
    });

    telemetryHub.on('DisabledObjectsCountChanged', (count) => {
        emitter.emit('updateTelemetryErrorCount', count);
    });
};
