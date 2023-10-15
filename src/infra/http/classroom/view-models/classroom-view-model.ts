import { Classroom } from '@app/entities/classroom';
import { LockViewModel } from '@infra/http/lock/view-models/lock-view-model';
import { UserViewModel } from '@infra/http/user/view-models/user-view-model';

export class ClassroomViewModel {
  static toHTTP(classroom: Classroom) {
    return {
      id: classroom.id,
      block: classroom.block,
      name: classroom.name,
      lock:
        classroom.lock != null ? LockViewModel.toHTTP(classroom.lock) : null,
      access:
        classroom.access != null
          ? classroom.access.map((value) => {
              return {
                id: value.id,
                access_type: value.accessType,
                user: UserViewModel.toHTTP(value.user),
                open_time: value.openTime,
                close_time: value.closeTime,
              };
            })
          : [],
    };
  }
  static toHTTPWithInfos(classroom: Classroom) {
    return {
      id: classroom.id,
      block: classroom.block,
      name: classroom.name,
      lock:
        classroom.lock != null ? LockViewModel.toHTTP(classroom.lock) : null,
      access:
        classroom.access != null
          ? classroom.access.map((value) => {
              return {
                id: value.id,
                user: UserViewModel.toHTTP(value.user),
                access_type: value.accessType,
                open_time: value.openTime,
                close_time: value.closeTime,
              };
            })
          : [],
      next_class:
        classroom.classes != null
          ? classroom.classes.map((value) => {
              return {
                id: value.id,
                name: value.subject,
                dayOfTheWeek: value.dayOfTheWeek,
                initialTime: value.initialTimeClass,
                endTime: value.endTimeClass,
              };
            })
          : [],
    };
  }
}
