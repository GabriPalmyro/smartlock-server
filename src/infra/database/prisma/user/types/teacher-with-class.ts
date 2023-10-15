import { Prisma } from '@prisma/client';

export type TeacherType = Prisma.UserGetPayload<{
  include: {
    class: {
      include: {
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
        teacher: true;
      };
    };
  };
}>;
