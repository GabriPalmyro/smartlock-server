import { Prisma } from '@prisma/client';

export type ClassroomWithAccess = Prisma.ClassroomGetPayload<{
  include: {
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
