import mqtt from 'mqtt'

export interface MqttConnOpt extends mqtt.IClientOptions { }

export declare type OnMessageFunc = (topic: string, payload: Buffer) => void

declare class Topic {
    public topic: string;
    public qos: 0 | 1 | 2;
}

export default class MQTT {
    mqclient: mqtt.MqttClient;
    brokerHost: string;
    brokerPort: number;
    subscribeTopics: Array<Topic>;

    constructor(host?: string | any, port?: number) {
        this.brokerHost = host;
        this.brokerPort = port;
        this.subscribeTopics = new Array<Topic>();
    }

    /**
    * 订阅主题
    */
    public subscribe(topic: string, qos: 0 | 1 | 2) {
        this.subscribeTopics.push({ topic: topic, qos: qos });
        if (this.is_connected()) {
            this.mqclient.subscribe(topic, { qos: qos });
        }
    }

    /**
    * 是否已连接到服务器
    */
    public is_connected() {
        return this.mqclient.connected == true;
    }

    /**
    * 连接到服务器
    */
    public connect(opts?: MqttConnOpt, onMessage?: OnMessageFunc) {
        this.mqclient = mqtt.connect(`ws://${this.brokerHost}:${this.brokerPort}`, opts);   //  我是测试项目使用的是免费的mqtt broker.emqx.io 这里拼接为ws

        this.mqclient.on('connect', () => {
            console.log(`成功连接到服务器[${this.brokerHost}:${this.brokerPort}]`);
            for (let index = 0; index < this.subscribeTopics.length; index++) {
                const element = this.subscribeTopics[index];
                this.mqclient.subscribe(element.topic, { qos: element.qos });
            }
        });

        this.mqclient.on('message', (topic: string, message) => {
            console.log('收到来自', topic, '的消息', message)
            onMessage && onMessage(topic, message)
        });

        this.mqclient.on('error', (err: Error) => {

        });
    }

    /**
    * 推送数据
    */
    public publish(topic: string, message: string, qos: 0 | 1 | 2) {
        this.mqclient.publish(topic, message, { qos: qos, retain: false })
    }

}