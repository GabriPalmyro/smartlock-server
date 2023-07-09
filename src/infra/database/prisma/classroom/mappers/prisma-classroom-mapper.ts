import { Classroom } from '@app/entities/classroom';
import { PrismaAccessMapper } from '../../access/mappers/prisma-access-mapper';
import { ClassroomWithAccess } from '../types/classroom-with-access';

export class PrismaClassroomMapper {
  static toPrisma(classroom: Classroom) {
    return {
      name: classroom.name,
      block: classroom.block,
    };
  }

  static toDomain(raw: ClassroomWithAccess): Classroom {
    return new Classroom({
      id: raw.id,
      name: raw.name,
      block: raw.block,
      access: raw.access.map(PrismaAccessMapper.toDomain),
    });
  }
}
