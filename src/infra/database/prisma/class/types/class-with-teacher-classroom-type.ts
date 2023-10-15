import { Prisma } from '@prisma/client';

export type ClassWithTeacherAndClassroom = Prisma.ClassGetPayload<{
  include: {
    teacher: true;
    classroom: {
      include: {
        lock: true;
        access: {
          include: {
            classroom: true;
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
