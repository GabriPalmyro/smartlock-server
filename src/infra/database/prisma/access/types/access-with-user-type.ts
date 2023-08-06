import { Prisma } from '@prisma/client';

export type AccessWithUser = Prisma.AccessGetPayload<{
  include: {
    classroom: true;
    user: true;
  };
}>;
