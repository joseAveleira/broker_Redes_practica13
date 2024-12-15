const aedes = require('aedes')();
const net = require('net');
const http = require('http');
const WebSocket = require('ws');

// Puertos para MQTT y WebSocket
const mqttPort = 1883;
const wsPort = 8888;

// Crear el servidor MQTT
const mqttServer = net.createServer(aedes.handle);

// Crear el servidor HTTP para WebSocket
const httpServer = http.createServer();
const wss = new WebSocket.Server({ server: httpServer });

// Configurar WebSocket para trabajar con Aedes
wss.on('connection', (ws) => {
    const stream = WebSocket.createWebSocketStream(ws);
    aedes.handle(stream);
});

// Mostrar información por consola cuando ocurren eventos MQTT
aedes.on('publish', (packet, client) => {
    if (client) {
        console.log(' - Message Published:', packet.topic);
    }
});

aedes.on('clientDisconnect', (client) => {
    console.log(' - Client Disconnected:', client.id);
});

aedes.on('client', (client) => {
    console.log(' - New Client:', client.id);
});

aedes.on('subscribe', (subscriptions, client) => {
    console.log(' - Client Subscribed:', subscriptions);
});

// Iniciar el servidor MQTT
mqttServer.listen(mqttPort, () => {
    console.log('Servidor MQTT en el puerto', mqttPort);
});

// Iniciar el servidor WebSocket
httpServer.listen(wsPort, () => {
    console.log('Servidor WebSocket en el puerto', wsPort);
});
