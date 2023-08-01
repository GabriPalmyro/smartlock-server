import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { LockRepository } from '@app/repositories/lock-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface UpdateClassroomRequest {
  id: string;
  block: string;
  name: string;
  lockId: string | null;
}

@Injectable()
export class UpdateClassroom {
  constructor(
    private classroomRepository: ClassroomRepository,
    private lockRepository: LockRepository,
  ) {}

  async execute(request: UpdateClassroomRequest): Promise<void> {
    const { id, block, name, lockId } = request;

    if (lockId != null) {
      const lock = await this.lockRepository.findById(lockId);

      if (lock.classroom != null) {
        throw new HttpException(
          'Outra sala já está atribuída a essa fechadura',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.classroomRepository.update(id, block, name, lockId);
  }
}
