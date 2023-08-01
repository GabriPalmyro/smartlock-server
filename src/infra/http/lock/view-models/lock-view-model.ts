import { Lock } from '@app/entities/Lock';
import { ClassroomViewModel } from '@infra/http/classroom/view-models/classroom-view-model';

export class LockViewModel {
  static toHTTP(lock: Lock) {
    return {
      id: lock.id,
      state: lock.state,
      name: lock.name,
    };
  }
}

export class LockWithClassroomViewModel {
  static toHTTP(lock: Lock) {
    return {
      id: lock.id,
      state: lock.state,
      name: lock.name,
      classroom: ClassroomViewModel.toHTTP(lock.classroom),
    };
  }
}
