import { Alerts } from '@app/entities/alert';
import { PrismaClassroomMapper } from '../../classroom/mappers/prisma-classroom-mapper';
import { AlertWithClassroomType } from '../types/alert-with-classroom.type';

export class PrismaAlertsMapper {
  static toPrisma(message: string, classroomId: string) {
    return {
      message: message,
      classroomId: classroomId,
    };
  }

  static toDomain(raw: AlertWithClassroomType): Alerts {
    return new Alerts({
      id: raw.id,
      message: raw.message,
      classroom: PrismaClassroomMapper.toDomain(raw.classroom),
      createdAt: raw.createdAt,
    });
  }
}
