import { Alerts } from '@app/entities/alert';

export class AlertViewModel {
  static toHTTP(alertsModel: Alerts) {
    return {
      id: alertsModel.id,
      message: alertsModel.message,
      classroomId: alertsModel.classroomId,
      createdAt: alertsModel.createdAt,
    };
  }
}
