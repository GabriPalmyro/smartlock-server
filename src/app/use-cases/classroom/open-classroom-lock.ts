import { Access } from '@app/entities/Access';
import { AccessRepository } from '@app/repositories/access_repository';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { LockRepository } from '@app/repositories/lock-repository';
import { UserRepository } from '@app/repositories/user-repository';
import { MqttService } from '@infra/mqtt/aws-broker/mqtt.service';
import { Injectable } from '@nestjs/common';

interface OpenClassroomLockRequest {
  userId: string;
  classroomId: string;
}

@Injectable()
export class OpenClassroomLock {
  constructor(
    private userRepository: UserRepository,
    private classroomRepository: ClassroomRepository,
    private lockRepository: LockRepository,
    private accessRepository: AccessRepository,
    private mqttService: MqttService,
  ) {}

  async execute(request: OpenClassroomLockRequest): Promise<void> {
    const { userId, classroomId } = request;

    const user = await this.userRepository.findById(userId);
    const classroom = await this.classroomRepository.findById(classroomId);

    // VERIFICAR SE É DOSCENTE OU MASTER
    // if(user.userTypeId == )

    const lock = classroom.lock;

    this.mqttService.openLock(lock.id);
    lock.state = true;

    await this.lockRepository.updateState(lock.id, true);

    const today = new Date();

    const access = new Access({
      accessType: 'App',
      openTime: today,
      user: user,
      classroomId: classroomId,
      closeTime: null,
      code: null,
    });

    await this.accessRepository.create(access);
  }
}
