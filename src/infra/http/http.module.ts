import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AlertsModule } from './alerts/alerts.module';
import { ClassModule } from './class/class.module';
import { ClassroomModule } from './classroom/classroom.module';
import { LockModule } from './lock/lock.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ClassModule,
    UserModule,
    ClassroomModule,
    LockModule,
    AlertsModule,
  ],
})
export class HttpModule {}
