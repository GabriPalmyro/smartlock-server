import { Access } from '@app/entities/access';
import { AccessRepository } from '@app/repositories/access_repository';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { LockRepository } from '@app/repositories/lock-repository';
import { UserRepository } from '@app/repositories/user-repository';
import { getBrasiliaTime } from '@helpers/date';
import { MqttService } from '@infra/mqtt/aws-broker/mqtt.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LockConnectionError } from 'src/core/errors/open-lock-error';

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
    const type = await this.userRepository.findUserTypeById(user.userTypeId);
    const classroom = await this.classroomRepository.findById(classroomId);

    // VERIFICAR SE É DOSCENTE OU MASTER
    if (type.type.toLowerCase() == 'discente') {
      throw new HttpException(
        'Você não possui autorização para fazer essa ação.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const lock = classroom.lock;

    if (!lock.state) {
      throw new HttpException(
        'Essa sala já se encontra aberta, verifique novamente no app ou vá até o local da sala.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const access = new Access({
        accessType: 'App',
        openTime: getBrasiliaTime(),
        user: user,
        classroomId: classroomId,
        closeTime: null,
        code: null,
      });

      await this.accessRepository.create(access);

      await this.mqttService.openLock(lock.id);
      lock.state = false;

      await this.lockRepository.updateState(lock.id, lock.state);
    } catch (error) {
      if (error instanceof LockConnectionError) {
        throw error;
      }
      // Relança outros erros que não sejam de conexão com a fechadura
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
