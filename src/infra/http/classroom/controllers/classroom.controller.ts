import { CreateClassroom } from '@app/use-cases/classroom/create-classroom';
import { GetClassInfos } from '@app/use-cases/classroom/get-class-infos';
import { ListClassroomsByBlock } from '@app/use-cases/classroom/list-classrooms-by-block';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateClassroomBody } from '../dtos/create-classroom-body';
import { ClassroomViewModel } from '../view-models/classroom-view-model';

@ApiTags('classroom')
@Controller('classroom')
export class ClassroomController {
  constructor(
    private createClassroom: CreateClassroom,
    private listClassroomsByBlock: ListClassroomsByBlock,
    private getClassroomInfoById: GetClassInfos,
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
}
