import { AlertRepository } from '@app/repositories/alerts_repository';
import { Injectable } from '@nestjs/common';

interface CreateAlertRequest {
  message: string;
  classroomId: string;
}

@Injectable()
export class CreateAlert {
  constructor(private alertRepository: AlertRepository) {}

  async execute(request: CreateAlertRequest): Promise<void> {
    const { message, classroomId } = request;

    await this.alertRepository.create(message, classroomId);
  }
}
