import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { ClassroomWithLockAccessClass } from '@infra/database/prisma/classroom/types/classroom-with-lock-access-class';
import { Injectable } from '@nestjs/common';

interface GetClassInfosRequest {
  classroomId: string;
}

interface GetClassInfosResponse {
  classroomInfos: ClassroomWithLockAccessClass;
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
