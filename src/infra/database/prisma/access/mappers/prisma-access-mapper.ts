import { Access } from '@app/entities/access';
import { PrismaUserMapper } from '../../user/mappers/prisma-user-mapper';
import { AccessWithUser } from '../types/access-with-user-type';

export class PrismaAccessMapper {
  static toPrisma(raw: Access) {
    return {
      accessType: raw.accessType,
      classroomId: raw.classroomId,
      closeTime: raw.closeTime,
      openTime: raw.openTime,
      temporaryCodeId: raw.code,
      userId: raw.user.id,
    };
  }

  static toDomain(raw: AccessWithUser): Access {
    return new Access({
      id: raw.id,
      accessType: raw.accessType,
      closeTime: raw.closeTime,
      openTime: raw.openTime,
      user: PrismaUserMapper.toDomain(raw.user),
      classroomId: raw.classroomId,
      code: raw.temporaryCodeId,
    });
  }
}
