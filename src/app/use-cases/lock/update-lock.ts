import { Lock } from '@app/entities/Lock';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { LockRepository } from '@app/repositories/lock-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface UpdateLockRequest {
  lockId: string;
  name: string;
  state: boolean;
  classroomId: string;
}

@Injectable()
export class UpdateLock {
  constructor(
    private lockRepository: LockRepository,
    private classroomRepository: ClassroomRepository,
  ) {}

  async execute(request: UpdateLockRequest): Promise<void> {
    const { lockId, name, state, classroomId } = request;

    const classroom = await this.classroomRepository.findById(classroomId);

    if (classroom.lock != null) {
      throw new HttpException(
        'Essa sala já possui uma fechadura atribuída',
        HttpStatus.BAD_REQUEST,
      );
    }

    const lockModel = new Lock({
      id: lockId,
      name,
      state,
    });

    this.lockRepository.update(lockModel, classroomId);
  }
}
