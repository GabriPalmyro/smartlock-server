import { MqttService } from '@infra/mqtt/aws-broker/mqtt.service';
import { Controller, Param, Post } from '@nestjs/common';

@Controller('class')
export class ClassController {
  constructor(readonly mqttService: MqttService) {}

  @Post('open/:id')
  async openLock(@Param('id') id: string) {
    this.mqttService.publish('open', `Hklmnklbjkd Testing on id ${id}`);
    return { success: true };
  }
}
