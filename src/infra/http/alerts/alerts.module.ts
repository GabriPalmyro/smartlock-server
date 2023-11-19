import { CreateAlert } from '@app/use-cases/alerts/create-alert';
import { ListAllAlerts } from '@app/use-cases/alerts/list-all-alerts';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AlertsController } from './controllers/alerts.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AlertsController],
  providers: [CreateAlert, ListAllAlerts],
})
export class AlertsModule {}
