import { CreateClassroom } from '@app/use-cases/classroom/create-classroom';
import { DeleteClassroom } from '@app/use-cases/classroom/delete-classroom';
import { GetClassInfos } from '@app/use-cases/classroom/get-class-infos';
import { ListClassroomsByBlock } from '@app/use-cases/classroom/list-classrooms-by-block';
import { OpenClassroomLock } from '@app/use-cases/classroom/open-classroom-lock';
import { UpdateClassroom } from '@app/use-cases/classroom/update-classroom';
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
import { ApiTags } from '@nestjs/swagger';
import { CreateClassroomBody } from '../dtos/create-classroom-body';
import { UpdateClassroomBody } from '../dtos/update-classroom-body';
import { ClassroomViewModel } from '../view-models/classroom-view-model';

@ApiTags('classroom')
@Controller('classroom')
export class ClassroomController {
  constructor(
    private createClassroom: CreateClassroom,
    private updateClassroom: UpdateClassroom,
    private deleteClassroom: DeleteClassroom,
    private listClassroomsByBlock: ListClassroomsByBlock,
    private getClassroomInfoById: GetClassInfos,
    private openClassroomLock: OpenClassroomLock,
    private mqttService: MqttService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body: CreateClassroomBody): Promise<ClassroomViewModel> {
    const { block, name } = body;
    const { classroom } = await this.createClassroom.execute({
      block,
      name,
    });

    return ClassroomViewModel.toHTTP(classroom);
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  async update(@Body() body: UpdateClassroomBody): Promise<void> {
    const { id, block, name, lockId } = body;
    await this.updateClassroom.execute({
      id,
      block,
      name,
      lockId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteClassroom.execute({
      id,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('block/:block')
  async listClassroomByBlock(
    @Param('block') block: string,
  ): Promise<ClassroomViewModel[]> {
    const { classrooms } = await this.listClassroomsByBlock.execute({
      block,
    });

    return classrooms.map(ClassroomViewModel.toHTTP);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async classroomInfosById(
    @Param('id') classroomId: string,
  ): Promise<ClassroomViewModel> {
    const { classroomInfos } = await this.getClassroomInfoById.execute({
      classroomId,
    });

    return ClassroomViewModel.toHTTPWithInfos(classroomInfos);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':userId/open/:classroomId')
  async openClassroom(
    @Param('classroomId') classroomId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    await this.openClassroomLock.execute({
      classroomId,
      userId,
    });
  }
}
