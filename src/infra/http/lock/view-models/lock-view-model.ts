import { Lock } from '@app/entities/Lock';

export class LockViewModel {
  static toHTTP(lock: Lock) {
    return {
      id: lock.id,
      state: lock.state,
      name: lock.name,
    };
  }
}
