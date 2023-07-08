import { CreateClass } from '@app/use-cases/class/create-class';
import { ListClassroomsByBlock } from '@app/use-cases/classroom/list-classrooms-by-block';
import { DatabaseModule } from '@infra/database/database.module';
import { MqttModule } from '@infra/mqtt/mqtt.module';
import { Module } from '@nestjs/common';
import { ClassController } from './controllers/class.controller';

@Module({
  imports: [DatabaseModule, MqttModule],
  controllers: [ClassController],
  providers: [CreateClass, ListClassroomsByBlock],
})
export class ClassModule {}
