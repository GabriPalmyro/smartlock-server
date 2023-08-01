import { Lock } from '@app/entities/Lock';
import { LockRepository } from '@app/repositories/lock-repository';
import { Injectable } from '@nestjs/common';

interface FindLockByIdRequest {
  lockId: string;
}

interface FindLockByIdResponse {
  lock: Lock;
}

@Injectable()
export class FindLockById {
  constructor(private lockRepository: LockRepository) {}

  async execute(request: FindLockByIdRequest): Promise<FindLockByIdResponse> {
    const { lockId } = request;

    const lock = await this.lockRepository.findById(lockId);

    return { lock };
  }
}
