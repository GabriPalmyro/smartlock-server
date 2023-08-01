import { CreateClass } from '@app/use-cases/class/create-class';
import { DeleteClass } from '@app/use-cases/class/delete-class';
import { ListAllClassess } from '@app/use-cases/class/list-all-class';
import { ListClassFromTodayByTeacher } from '@app/use-cases/class/list-today-by-teacher';
import { UpdateClass } from '@app/use-cases/class/update-class';
import { DatabaseModule } from '@infra/database/database.module';
import { MqttModule } from '@infra/mqtt/mqtt.module';
import { Module } from '@nestjs/common';
import { ClassController } from './controllers/class.controller';

@Module({
  imports: [DatabaseModule, MqttModule],
  controllers: [ClassController],
  providers: [
    CreateClass,
    ListClassFromTodayByTeacher,
    UpdateClass,
    DeleteClass,
    ListAllClassess,
  ],
})
export class ClassModule {}
