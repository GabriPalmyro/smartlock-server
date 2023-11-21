import { Alerts } from '@app/entities/alert';
import { ClassroomViewModel } from '@infra/http/classroom/view-models/classroom-view-model';

export class AlertViewModel {
  static toHTTP(alertsModel: Alerts) {
    return {
      id: alertsModel.id,
      message: alertsModel.message,
      classroom: ClassroomViewModel.toHTTPWithoutAccess(alertsModel.classroom),
      createdAt: alertsModel.createdAt,
    };
  }
}
