import { Classroom } from '@app/entities/classroom';
import { ClassroomWithLockAccessClass } from '@infra/database/prisma/classroom/types/classroom-with-lock-access-class';

export abstract class ClassroomRepository {
  abstract create(classroom: Classroom): Promise<string>;

  abstract listAll(): Promise<Classroom[]> | null;

  abstract findById(
    classroomId: string,
  ): Promise<ClassroomWithLockAccessClass> | null;

  abstract listByBlock(block: string): Promise<Classroom[]> | null;

  abstract findByBlockAndName(
    block: string,
    name: string,
  ): Promise<Classroom> | null;

  abstract update(
    classroomId: string,
    block: string,
    name: string,
  ): Promise<void>;

  abstract delete(classroomId: string): Promise<void>;
}
