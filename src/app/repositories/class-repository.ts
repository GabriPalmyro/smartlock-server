import { Class } from '@app/entities/Class';

export abstract class ClassRepository {
  abstract create(
    classModel: Class,
    teacherId: string,
    classroomId: string,
  ): Promise<Class>;

  abstract listAll(): Promise<Class[]> | null;

  abstract findById(classId: string): Promise<Class> | null;

  abstract update(
    classModel: Class,
    teacherId: string,
    classroomId: string,
  ): Promise<void>;

  abstract delete(classId: string): Promise<void>;

  abstract listAllClassFromTeacherIdFromToday(
    teacherId: string,
    todayDayOfWeek: number,
  ): Promise<Class[]>;
}
