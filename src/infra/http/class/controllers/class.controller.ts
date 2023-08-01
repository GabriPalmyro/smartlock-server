import { CreateClass } from '@app/use-cases/class/create-class';
import { DeleteClass } from '@app/use-cases/class/delete-class';
import { ListAllClassess } from '@app/use-cases/class/list-all-class';
import { ListClassFromTodayByTeacher } from '@app/use-cases/class/list-today-by-teacher';
import { UpdateClass } from '@app/use-cases/class/update-class';
import { MqttService } from '@infra/mqtt/aws-broker/mqtt.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateClassBody } from '../dtos/create-class-body';
import { UpdateClassBody } from '../dtos/update-class-body';
import { ClassViewModel } from '../view-models/class-view-model';

@ApiTags('class')
@Controller('class')
export class ClassController {
  constructor(
    readonly mqttService: MqttService,
    private createClass: CreateClass,
    private updateClassUseCase: UpdateClass,
    private deleteClassUseCase: DeleteClass,
    private listClassFromTodayByTeacher: ListClassFromTodayByTeacher,
    private listAllUseCase: ListAllClassess,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateClassBody })
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

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateClassBody })
  @Patch()
  async update(@Body() body: UpdateClassBody): Promise<void> {
    const {
      id,
      subject,
      initialDay,
      endDay,
      initialTimeClass,
      endTimeClass,
      dayOfTheWeek,
      teacherId,
      classroomId,
    } = body;

    await this.updateClassUseCase.execute({
      id,
      subject,
      initialDay,
      endDay,
      initialTimeClass,
      endTimeClass,
      dayOfTheWeek,
      teacherId,
      classroomId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteClassUseCase.execute({
      classId: id,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async listAll(): Promise<ClassViewModel> {
    const { classes } = await this.listAllUseCase.execute();

    return classes.map(ClassViewModel.toHTTP);
  }

  @HttpCode(HttpStatus.OK)
  @Get('teacher/:teacherId/today')
  async classesFromTodayByTeacher(
    @Param('teacherId') teacherId: string,
  ): Promise<ClassViewModel> {
    const { classes } = await this.listClassFromTodayByTeacher.execute({
      teacherId,
    });

    return classes.map(ClassViewModel.toHTTP);
  }
}
