import { Classroom } from '@app/entities/classroom';
import { Classroom as RawClassroom } from '@prisma/client';
import { PrismaAccessMapper } from '../../access/mappers/prisma-access-mapper';
import { PrismaClassMapper } from '../../class/mappers/prisma-class-mapper';
import { PrismaLockMapper } from '../../lock/mappers/prisma-lock-mappers';
import { ClassroomWithAccess } from '../types/classroom-with-access';
import { ClassroomWithLockAccessClass } from '../types/classroom-with-lock-access-class';

export class PrismaClassroomMapper {
  static toPrisma(classroom: Classroom) {
    return {
      name: classroom.name,
      block: classroom.block,
    };
  }

  static toDomainWithAccess(raw: ClassroomWithAccess): Classroom {
    return new Classroom({
      id: raw.id,
      name: raw.name,
      block: raw.block,
      access: raw.access.map(PrismaAccessMapper.toDomain),
    });
  }

  static toDomainWithAccessAndClass(
    raw: ClassroomWithLockAccessClass,
  ): Classroom {
    return new Classroom({
      id: raw.id,
      name: raw.name,
      block: raw.block,
      access: raw.access.map(PrismaAccessMapper.toDomain),
      lock: raw.lock != null ? PrismaLockMapper.toDomain(raw.lock) : null,
      classes: raw.Class.map(PrismaClassMapper.toDomain),
    });
  }

  static toDomain(raw: RawClassroom): Classroom {
    return new Classroom({
      id: raw.id,
      name: raw.name,
      block: raw.block,
    });
  }
}
