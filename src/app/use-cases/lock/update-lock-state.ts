import { LockRepository } from '@app/repositories/lock-repository';
import { Injectable } from '@nestjs/common';

interface UpdateLockStateRequest {
  lockId: string;
  state: boolean;
}

@Injectable()
export class UpdateLockState {
  constructor(private lockRepository: LockRepository) {}

  async execute(request: UpdateLockStateRequest): Promise<void> {
    const { lockId, state } = request;

    this.lockRepository.updateState(lockId, state);
  }
}
