//mqtt.js client publish message to broker
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
    setInterval(function() {
        var temperature = Math.floor(Math.random() * 31); // Genera un número aleatorio entre 0 y 30
        var humidity = Math.floor(Math.random() * 91) + 10; // Genera un número aleatorio entre 10 y 100

        var message = JSON.stringify({
            temperature: temperature,
            humidity: humidity
        });

        client.publish('salon/temperatura', message);
    }, 3000); // Envia un mensaje cada 3 segundos
});
