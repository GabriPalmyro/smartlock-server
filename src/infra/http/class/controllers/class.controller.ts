import { CreateClass } from '@app/use-cases/class/create-class';
import { MqttService } from '@infra/mqtt/aws-broker/mqtt.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateClassBody } from '../dtos/create-class-body';
import { ClassViewModel } from '../view-models/class-view-model';

@ApiTags('class')
@Controller('class')
export class ClassController {
  constructor(
    readonly mqttService: MqttService,
    private createClass: CreateClass,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body: CreateClassBody): Promise<ClassViewModel> {
    const {
      subject,
      initialDay,
      endDay,
      initialTimeClass,
      endTimeClass,
      dayOfTheWeek,
      teacherId,
      classroomId,
    } = body;

    const { classCreated } = await this.createClass.execute({
      subject,
      initialDay,
      endDay,
      initialTimeClass,
      endTimeClass,
      dayOfTheWeek,
      teacherId,
      classroomId,
    });

    return ClassViewModel.toHTTP(classCreated);
  }
}
