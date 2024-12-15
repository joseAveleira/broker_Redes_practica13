var mqtt = require('mqtt');

// Configuración del cliente MQTT
var options = {
    username: 'redesOrdenadores', // Usuario
    password: 'datos2024',        // Contraseña
};

// Conexión al bróker
var client = mqtt.connect('mqtt://joseaveleira.es:1883', options);

client.on('connect', function () {
    console.log('Conectado al bróker MQTT');

    // Suscribirse al topic
    client.subscribe('salon/temperatura', function (err) {
        if (!err) {
            console.log('Suscrito al topic: salon/temperatura');
        } else {
            console.error('Error al suscribirse:', err);
        }
    });

    // Escuchar mensajes del topic
    client.on('message', function (topic, message) {
        console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
    });
});

client.on('error', function (err) {
    console.error('Error en la conexión:', err);
});