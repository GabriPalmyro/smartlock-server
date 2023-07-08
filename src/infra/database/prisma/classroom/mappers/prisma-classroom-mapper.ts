import { Classroom } from '@app/entities/classroom';
import { Classroom as RawClassroom } from '@prisma/client';

export class PrismaClassroomMapper {
  static toPrisma(classroom: Classroom) {
    return {
      name: classroom.name,
      block: classroom.block,
    };
  }

  static toDomain(raw: RawClassroom): Classroom {
    return new Classroom({
      id: raw.id,
      name: raw.name,
      block: raw.block,
    });
  }
}
