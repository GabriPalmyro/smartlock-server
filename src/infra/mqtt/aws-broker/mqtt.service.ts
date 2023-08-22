import { HttpStatus, Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { LockConnectionError } from 'src/core/errors/open-lock-error';

@Injectable()
export class MqttService {
  private client: mqtt.Client;

  constructor() {
    // this.client = mqtt.connect(
    //   'mqtt://ec2-18-228-3-56.sa-east-1.compute.amazonaws.com',
    //   {
    //     port: 1883,
    //   },
    // );
    // this.client.on('error', function (error) {
    //   console.log('MQTT client error:', error);
    // });
    // this.client.on('offline', function () {
    //   console.log('MQTT client offline');
    // });
    // this.client.on('close', function () {
    //   console.log('MQTT client connection closed');
    // });
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.error(`Error publishing to MQTT topic ${topic}: ${err}`);
      }
    });
  }

  async openLock(lockId: string): Promise<void> {
    try {
      this.client.publish('open', lockId, (err) => {
        if (err) {
          console.error(`Error publishing to MQTT topic 'open': ${err}`);
          throw new LockConnectionError(
            'Ocorreu um problema ao conectar a fechadura',
            HttpStatus.BAD_REQUEST,
          );
        }
      });
    } catch (error) {
      console.error('Erro capturado ao publicar no tópico MQTT:', error);
      // Aqui, você pode optar por relançar o erro ou lidar com ele de alguma outra maneira
      throw error;
    }
  }

  connected(): boolean {
    return this.client.connected;
  }
}
