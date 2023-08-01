import { Classroom } from '@app/entities/classroom';

export abstract class ClassroomRepository {
  abstract create(classroom: Classroom): Promise<string>;

  abstract listAll(): Promise<Classroom[]> | null;

  abstract findById(classroomId: string): Promise<Classroom> | null;

  abstract listByBlock(block: string): Promise<Classroom[]> | null;

  abstract findByBlockAndName(
    block: string,
    name: string,
  ): Promise<Classroom> | null;

  abstract update(
    id: string,
    block: string,
    name: string,
    lockId: string | null,
  ): Promise<void>;

  abstract updateLockState(classroomId: string, state: boolean): Promise<void>;

  abstract delete(classroomId: string): Promise<void>;
}
