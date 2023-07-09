import { Prisma } from '@prisma/client';

export type ClassroomWithAccess = Prisma.ClassroomGetPayload<{
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
}>;
