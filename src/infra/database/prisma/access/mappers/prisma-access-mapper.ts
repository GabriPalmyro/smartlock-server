import { Access } from '@app/entities/Access';
import { Access as RawAccess } from '@prisma/client';

export class PrismaAccessMapper {
  static toDomain(raw: RawAccess): Access {
    return new Access({
      id: raw.id,
      accessType: raw.accessType,
      closeTime: raw.closeTime,
      openTime: raw.openTime,
      userId: raw.userId,
      classroomId: raw.classroomId,
      code: raw.temporaryCodeId,
    });
  }
}
