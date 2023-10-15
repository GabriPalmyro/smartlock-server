import { Lock } from '@app/entities/lock';
import { Lock as RawLock } from '@prisma/client';
import { PrismaClassroomMapper } from '../../classroom/mappers/prisma-classroom-mapper';
import { LockWithClassroom } from '../types/lock-with-classroom';

export class PrismaLockMapper {
  static toPrisma(lock: Lock) {
    return {
      id: lock.id,
      name: lock.name,
      isClosed: lock.state,
      classroomId: lock.classroom.id,
    };
  }

  static toDomain(raw: RawLock): Lock {
    return new Lock({
      id: raw.id,
      name: raw.name,
      state: raw.isClosed,
    });
  }

  static toDomainWithClassroom(raw: LockWithClassroom): Lock {
    return new Lock({
      id: raw.id,
      name: raw.name,
      state: raw.isClosed,
      classroom: PrismaClassroomMapper.toDomain(raw.classroom),
    });
  }
}
