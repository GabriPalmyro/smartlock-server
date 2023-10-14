import { Teacher } from '@app/entities/teacher';
import { PrismaClassMapper } from '../../class/mappers/prisma-class-mapper';
import { TeacherType } from '../types/teacher-with-class';

export class PrismaTeacherMapper {
  static toDomain(raw: TeacherType): Teacher {
    return new Teacher({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      code: raw.code,
      userTypeId: raw.userTypeId,
      createdAt: raw.createdAt,
      updateAt: raw.updatedAt,
      class: raw.class.map(PrismaClassMapper.toDomainWithTeacherAndClassroom),
      access: [],
    });
  }
}
