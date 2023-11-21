import { Prisma } from '@prisma/client';

export type AlertWithClassroomType = Prisma.AlertsGetPayload<{
  include: {
    classroom: true;
  };
}>;
