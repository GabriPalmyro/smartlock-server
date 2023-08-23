import { Lock } from '@app/entities/lock';
import { LockRepository } from '@app/repositories/lock-repository';
import { Injectable } from '@nestjs/common';

interface ListAllLocksResponse {
  locks: Lock[];
}

@Injectable()
export class ListAllLocks {
  constructor(private lockRepository: LockRepository) {}

  async execute(): Promise<ListAllLocksResponse> {
    const locks = await this.lockRepository.listAll();

    return { locks };
  }
}
