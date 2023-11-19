import { Alerts } from '@app/entities/alert';
import { AlertRepository } from '@app/repositories/alerts_repository';
import { Injectable } from '@nestjs/common';

interface ListAllAlertsResponse {
  alerts: Alerts[];
}

@Injectable()
export class ListAllAlerts {
  constructor(private alertsRepository: AlertRepository) {}

  async execute(): Promise<ListAllAlertsResponse> {
    const alerts = await this.alertsRepository.listAll();

    return { alerts };
  }
}
