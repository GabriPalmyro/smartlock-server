import { Prisma } from '@prisma/client';

export type TeacherType = Prisma.UserGetPayload<{
  include: {
    class: {
      include: {
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
        teacher: true;
      };
    };
  };
}>;
