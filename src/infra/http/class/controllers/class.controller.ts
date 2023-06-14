import { MqttService } from '@infra/mqtt/aws-broker/mqtt.service';
import { Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('class')
@Controller('class')
export class ClassController {
  constructor(readonly mqttService: MqttService) {}

  @Post('open/:id')
  async openLock(@Param('id') id: string) {
    this.mqttService.publish('open', `Hklmnklbjkd Testing on id ${id}`);
    return { success: true };
  }
}
