import { CloseClassroomLock } from '@app/use-cases/classroom/close-classroom-lock';
import { CreateClassroom } from '@app/use-cases/classroom/create-classroom';
import { DeleteClassroom } from '@app/use-cases/classroom/delete-classroom';
import { GetClassInfos } from '@app/use-cases/classroom/get-class-infos';
import { ListClassroomsByBlock } from '@app/use-cases/classroom/list-classrooms-by-block';
import { OpenClassroomLock } from '@app/use-cases/classroom/open-classroom-lock';
import { UpdateClassroom } from '@app/use-cases/classroom/update-classroom';
import { DatabaseModule } from '@infra/database/database.module';
import { MqttModule } from '@infra/mqtt/mqtt.module';
import { Module } from '@nestjs/common';
import { ClassroomController } from './controllers/classroom.controller';

@Module({
  imports: [DatabaseModule, MqttModule],
  controllers: [ClassroomController],
  providers: [
    CreateClassroom,
    UpdateClassroom,
    ListClassroomsByBlock,
    GetClassInfos,
    DeleteClassroom,
    OpenClassroomLock,
    CloseClassroomLock,
  ],
})
export class ClassroomModule {}
