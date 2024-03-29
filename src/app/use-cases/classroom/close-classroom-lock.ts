import { AccessRepository } from '@app/repositories/access_repository';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { LockRepository } from '@app/repositories/lock-repository';
import { getBrasiliaTime } from '@helpers/date';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface CloseClassroomLockRequest {
  classroomId: string;
}

@Injectable()
export class CloseClassroomLock {
  constructor(
    private classroomRepository: ClassroomRepository,
    private lockRepository: LockRepository,
    private accessRepository: AccessRepository,
  ) {}

  async execute(request: CloseClassroomLockRequest): Promise<void> {
    const { classroomId } = request;

    const access = await this.accessRepository.findLastClassroomAccess(
      classroomId,
    );
    const classroom = await this.classroomRepository.findById(classroomId);

    if (classroom.lock.state) {
      throw new HttpException(
        'Essa sala já se encontra fechada, verifique novamente no app ou vá até o local da sala.',
        HttpStatus.BAD_REQUEST,
      );
    }

    access.closeTime = getBrasiliaTime();

    await this.accessRepository.update(access);

    // close lock state
    const lock = classroom.lock;

    lock.state = true;

    await this.lockRepository.updateState(lock.id, lock.state);
  }
}
