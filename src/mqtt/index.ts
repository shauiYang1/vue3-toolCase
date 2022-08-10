
import mqtt from 'mqtt'

const options = {
    host: 'b5b25d8f799e49218df204af1475e90e.s2.eu.hivemq.cloud',
    port: 8883,
    username: 'yangshuai',
    password: '111aaa@@'
}

// initialize the MQTT client
const client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Hello');