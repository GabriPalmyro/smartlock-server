import { Classroom } from '@app/entities/classroom';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { Injectable } from '@nestjs/common';

interface ListClassroomsByBlockRequest {
  block: string;
}

interface ListClassroomsByBlockResponse {
  classrooms: Classroom[];
}

@Injectable()
export class ListClassroomsByBlock {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(
    request: ListClassroomsByBlockRequest,
  ): Promise<ListClassroomsByBlockResponse> {
    const { block } = request;

    const classrooms = await this.classroomRepository.listByBlock(block);

    return { classrooms };
  }
}
