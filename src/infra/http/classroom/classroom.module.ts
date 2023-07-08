import { CreateClassroom } from '@app/use-cases/classroom/create-classroom';
import { ListClassroomsByBlock } from '@app/use-cases/classroom/list-classrooms-by-block';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ClassroomController } from './controllers/classroom.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassroomController],
  providers: [CreateClassroom, ListClassroomsByBlock],
})
export class ClassroomModule {}
