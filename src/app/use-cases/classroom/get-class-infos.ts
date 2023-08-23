import { Classroom } from '@app/entities/classroom';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { Injectable } from '@nestjs/common';

interface GetClassInfosRequest {
  classroomId: string;
}

interface GetClassInfosResponse {
  classroomInfos: Classroom;
}

@Injectable()
export class GetClassInfos {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(request: GetClassInfosRequest): Promise<GetClassInfosResponse> {
    const { classroomId } = request;

    const classroomInfos = await this.classroomRepository.findById(classroomId);

    return { classroomInfos };
  }
}
