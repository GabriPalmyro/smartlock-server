import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { Injectable } from '@nestjs/common';

interface DeleteClassroomRequest {
  id: string;
}

@Injectable()
export class DeleteClassroom {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(request: DeleteClassroomRequest): Promise<void> {
    const { id } = request;

    await this.classroomRepository.delete(id);
  }
}
