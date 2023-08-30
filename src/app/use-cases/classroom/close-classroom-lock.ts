import { AccessRepository } from '@app/repositories/access_repository';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { LockRepository } from '@app/repositories/lock-repository';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

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

    const currentUTC = DateTime.utc(); // Obtém a hora atual em UTC
    const brasiliaTime = currentUTC.setZone('America/Sao_Paulo'); // Converte para o horário de Brasília

    const dateObject: Date = brasiliaTime.toJSDate(); // Convertendo para um objeto Date do JS

    console.log(`brazilian date ${brasiliaTime.toJSDate()}`); // O horário de Brasília como um objeto Date

    access.closeTime = dateObject;

    await this.accessRepository.update(access);

    // close lock state

    const classroom = await this.classroomRepository.findById(classroomId);

    const lock = classroom.lock;

    lock.state = true;

    await this.lockRepository.updateState(lock.id, lock.state);
  }
}
