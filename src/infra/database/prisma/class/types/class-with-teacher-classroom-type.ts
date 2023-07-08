import { Prisma } from '@prisma/client';

export type ClassWithTeacherAndClassroom = Prisma.ClassGetPayload<{
  include: {
    teacher: true;
    classroom: true;
  };
}>;
