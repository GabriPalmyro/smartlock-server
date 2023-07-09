import { Classroom } from '@app/entities/classroom';
import { ClassroomWithLockAccessClass } from '@infra/database/prisma/classroom/types/classroom-with-lock-access-class';
import { PrismaLockMapper } from '@infra/database/prisma/lock/mappers/prisma-lock-mappers';
import { PrismaUserMapper } from '@infra/database/prisma/user/mappers/prisma-user-mapper';
import { LockViewModel } from '@infra/http/lock/view-models/lock-view-model';
import { UserViewModel } from '@infra/http/user/view-models/user-view-model';

export class ClassroomViewModel {
  static toHTTP(classroom: Classroom) {
    return {
      id: classroom.id,
      block: classroom.block,
      name: classroom.name,
      access:
        classroom.access != null
          ? classroom.access.map((value) => {
              return {
                id: value.id,
                access_type: value.accessType,
                open_time: value.openTime,
                close_time: value.closeTime,
              };
            })
          : [],
    };
  }
  static toHTTPWithInfos(classroom: ClassroomWithLockAccessClass) {
    return {
      id: classroom.id,
      block: classroom.block,
      name: classroom.name,
      lock: LockViewModel.toHTTP(PrismaLockMapper.toDomain(classroom.lock)),
      access:
        classroom.access != null
          ? classroom.access.map((value) => {
              return {
                id: value.id,
                user: UserViewModel.toHTTP(
                  PrismaUserMapper.toDomain(value.user),
                ),
                access_type: value.accessType,
                open_time: value.openTime,
                close_time: value.closeTime,
              };
            })
          : [],
      next_class:
        classroom.Class != null
          ? classroom.Class.map((value) => {
              return {
                id: value.id,
                name: value.subject,
                initialTime: value.initialTimeClass,
                endTime: value.endTimeClass,
              };
            })
          : [],
    };
  }
}
