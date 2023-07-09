import { Prisma } from '@prisma/client';

export type ClassWithTeacherAndClassroom = Prisma.ClassGetPayload<{
  include: {
    teacher: true;
    classroom: {
      include: {
        access: {
          include: {
            user: true;
          };
          orderBy: {
            openTime: 'asc';
          };
        };
      };
    };
  };
}>;
