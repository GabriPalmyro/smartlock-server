import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ClassModule } from './class/class.module';
import { ClassroomModule } from './classroom/classroom.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, ClassModule, UserModule, ClassroomModule],
})
export class HttpModule {}
