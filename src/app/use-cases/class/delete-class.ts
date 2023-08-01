import { ClassRepository } from '@app/repositories/class-repository';
import { Injectable } from '@nestjs/common';

interface DeleteClassRequest {
  classId: string;
}

@Injectable()
export class DeleteClass {
  constructor(private classRepository: ClassRepository) {}

  async execute(request: DeleteClassRequest): Promise<void> {
    const { classId } = request;

    await this.classRepository.delete(classId);
  }
}
