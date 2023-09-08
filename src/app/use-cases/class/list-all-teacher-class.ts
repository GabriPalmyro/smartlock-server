import { Class } from '@app/entities/class';
import { ClassRepository } from '@app/repositories/class-repository';
import { Injectable } from '@nestjs/common';

interface ListClassByTeacherRequest {
  teacherId: string;
}

interface ListClassByTeacherResponse {
  classes: Class[];
}

@Injectable()
export class ListClassByTeacher {
  constructor(private classRepository: ClassRepository) {}

  async execute(
    request: ListClassByTeacherRequest,
  ): Promise<ListClassByTeacherResponse> {
    const { teacherId } = request;

    const classes = await this.classRepository.listAllClassFromTeacherId(
      teacherId,
    );

    return { classes };
  }
}
