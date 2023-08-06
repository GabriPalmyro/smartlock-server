import { Prisma } from '@prisma/client';

export type ClassroomWithLockAccessClass = Prisma.ClassroomGetPayload<{
  include: {
    Class: {
      teacher: true;
      classroom: true;
      orderBy: {
        initialTimeClass: 'asc';
      };
    };
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
}>;
