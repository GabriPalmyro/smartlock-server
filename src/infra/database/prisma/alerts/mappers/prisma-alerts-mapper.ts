import { Alerts } from '@app/entities/alert';
import { Alerts as RawAlerts } from '@prisma/client';

export class PrismaAlertsMapper {
  static toPrisma(raw: Alerts) {
    return {
      message: raw.message,
      classroomId: raw.classroomId,
    };
  }

  static toDomain(raw: RawAlerts): Alerts {
    return new Alerts({
      id: raw.id,
      message: raw.message,
      classroomId: raw.classroomId,
      createdAt: raw.createdAt,
    });
  }
}
