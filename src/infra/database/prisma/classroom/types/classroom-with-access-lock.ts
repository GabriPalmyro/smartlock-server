import { Prisma } from '@prisma/client';

export type ClassroomWithAccessLock = Prisma.ClassroomGetPayload<{
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
}>;
