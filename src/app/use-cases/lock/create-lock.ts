import { Lock } from '@app/entities/Lock';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { LockRepository } from '@app/repositories/lock-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface CreateLockRequest {
  name: string;
  classroomId: string;
}

interface CreateLockResponse {
  lockId: string;
}

@Injectable()
export class CreateLock {
  constructor(
    private lockRepository: LockRepository,
    private classroomRepository: ClassroomRepository,
  ) {}

  async execute(request: CreateLockRequest): Promise<CreateLockResponse> {
    const { name, classroomId } = request;

    const classroom = await this.classroomRepository.findById(classroomId);

    if (classroom.lock != null) {
      throw new HttpException(
        'Essa sala já possui uma fechadura atribuída',
        HttpStatus.BAD_REQUEST,
      );
    }

    const lockModel = new Lock({
      name,
      state: false,
      classroom: classroom,
    });

    const lockId = await this.lockRepository.create(lockModel);

    return { lockId };
  }
}
