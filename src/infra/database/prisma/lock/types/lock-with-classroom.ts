import { Prisma } from '@prisma/client';

export type LockWithClassroom = Prisma.LockGetPayload<{
  include: {
    classroom: true;
  };
}>;
