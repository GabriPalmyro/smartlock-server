import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ClassModule } from './class/button.module';

@Module({
  imports: [DatabaseModule, ClassModule],
})
export class HttpModule {}
