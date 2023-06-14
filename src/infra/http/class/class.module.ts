import { DatabaseModule } from '@infra/database/database.module';
import { MqttModule } from '@infra/mqtt/mqtt.module';
import { Module } from '@nestjs/common';
import { ClassController } from './controllers/class.controller';

@Module({
  imports: [DatabaseModule, MqttModule],
  controllers: [ClassController],
  providers: [],
})
export class ClassModule {}
