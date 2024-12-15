//mqtt.js client subscribe to topic from broker
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
    client.subscribe('salon/temperatura');
    client.on('message', function (topic, message) {

        console.log(message.toString());
    });
});
