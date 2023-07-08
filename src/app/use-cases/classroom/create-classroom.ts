import { Classroom } from '@app/entities/classroom';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface CreateClassroomRequest {
  block: string;
  name: string;
}

interface CreateClassroomResponse {
  classroom: Classroom;
}

@Injectable()
export class CreateClassroom {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(
    request: CreateClassroomRequest,
  ): Promise<CreateClassroomResponse> {
    const { block, name } = request;

    const classroomExists = await this.classroomRepository.findByBlockAndName(
      block,
      name,
    );

    if (classroomExists) {
      throw new HttpException(
        'A sala de aula informada já foi criada.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const classroom = new Classroom({
      name: name,
      block: block,
    });

    const userId = await this.classroomRepository.create(classroom);
    classroom.id = userId;

    return { classroom };
  }
}
