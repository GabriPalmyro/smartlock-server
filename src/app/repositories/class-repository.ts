import { Class } from '@app/entities/Class';

export abstract class ClassRepository {
  abstract create(
    classModel: Class,
    teacherId: number,
    classroomId: number,
  ): Promise<Class>;

  abstract listAll(): Promise<Class[]> | null;

  abstract findById(classId: number): Promise<Class> | null;

  abstract update(classId: number): Promise<void>;

  abstract delete(classId: number): Promise<void>;
}
