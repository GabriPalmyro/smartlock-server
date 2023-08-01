import { Lock } from '@app/entities/lock';

export abstract class LockRepository {
  abstract create(lock: Lock): Promise<string>;

  abstract listAll(): Promise<Lock[]> | null;

  abstract findById(lockId: string): Promise<Lock> | null;

  abstract update(lock: Lock, classroomId: string | null): Promise<void>;

  abstract updateState(lockId: string, state: boolean): Promise<void>;

  abstract delete(lockId: string): Promise<void>;
}
