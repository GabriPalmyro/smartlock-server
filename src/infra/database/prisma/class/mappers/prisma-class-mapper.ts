import { Class } from '@app/entities/class';
import { Class as RawClass } from '@prisma/client';
import { PrismaClassroomMapper } from '../../classroom/mappers/prisma-classroom-mapper';
import { PrismaUserMapper } from '../../user/mappers/prisma-user-mapper';
import { ClassWithTeacherAndClassroom } from '../types/class-with-teacher-classroom-type';

export class PrismaClassMapper {
  static toPrisma(classModel: Class, teacherId: string, classroomId: string) {
    return {
      subject: classModel.subject,
      dayOfTheWeek: classModel.dayOfTheWeek,
      initialDay: classModel.initialDay,
      endDay: classModel.endDay,
      initialTimeClass: classModel.initialTimeClass,
      endTimeClass: classModel.endTimeClass,
      teacherId: teacherId,
      classroomId: classroomId,
    };
  }

  static toDomain(raw: RawClass): Class {
    return new Class({
      id: raw.id,
      subject: raw.subject,
      initialDay: raw.initialDay,
      endDay: raw.endDay,
      initialTimeClass: raw.initialTimeClass,
      endTimeClass: raw.endTimeClass,
      dayOfTheWeek: raw.dayOfTheWeek,
    });
  }

  static toDomainWithTeacherAndClassroom(
    raw: ClassWithTeacherAndClassroom,
  ): Class {
    return new Class({
      id: raw.id,
      subject: raw.subject,
      initialDay: raw.initialDay,
      endDay: raw.endDay,
      initialTimeClass: raw.initialTimeClass,
      endTimeClass: raw.endTimeClass,
      dayOfTheWeek: raw.dayOfTheWeek,
      teacher: PrismaUserMapper.toDomain(raw.teacher),
      classroom: PrismaClassroomMapper.toDomain(raw.classroom),
    });
  }
}
