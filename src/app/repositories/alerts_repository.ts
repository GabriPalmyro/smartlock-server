import { Alerts } from '@app/entities/alert';

export abstract class AlertRepository {
  abstract create(message: string, classroomId: string): Promise<void>;

  abstract update(alert: Alerts): Promise<void>;

  abstract delete(alertId: string): Promise<void>;

  abstract listAll(): Promise<Alerts[]>;

  abstract findById(alertId: string): Promise<Alerts> | null;
}
