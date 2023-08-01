import { LockRepository } from '@app/repositories/lock-repository';
import { Injectable } from '@nestjs/common';

interface DeleteLockRequest {
  id: string;
}

@Injectable()
export class DeleteLock {
  constructor(private lockRepository: LockRepository) {}

  async execute(request: DeleteLockRequest): Promise<void> {
    const { id } = request;

    await this.lockRepository.delete(id);
  }
}
