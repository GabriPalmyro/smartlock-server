import { Classroom } from '@app/entities/classroom';

export abstract class ClassroomRepository {
  abstract create(classroom: Classroom): Promise<number>;

  abstract listAll(): Promise<Classroom[]> | null;

  abstract findById(classroomId: number): Promise<Classroom> | null;

  abstract listByBlock(block: string): Promise<Classroom[]> | null;

  abstract findByBlockAndName(
    block: string,
    name: string,
  ): Promise<Classroom> | null;

  abstract update(
    classroomId: number,
    block: string,
    name: string,
  ): Promise<void>;

  abstract delete(classroomId: number): Promise<void>;
}
