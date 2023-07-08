import { Class } from '@app/entities/Class';
import { ClassRepository } from '@app/repositories/class-repository';
import { Injectable } from '@nestjs/common';

interface CreateClassRequest {
  subject: string;
  initialDay: Date;
  endDay: Date;
  initialTimeClass: Date;
  endTimeClass: Date;
  dayOfTheWeek: number;
  teacherId: number | null;
  classroomId: number | null;
}

interface CreateClassResponse {
  classCreated: Class;
}

@Injectable()
export class CreateClass {
  constructor(private classRepository: ClassRepository) {}

  async execute(request: CreateClassRequest): Promise<CreateClassResponse> {
    const {
      subject,
      initialDay,
      endDay,
      initialTimeClass,
      endTimeClass,
      dayOfTheWeek,
      teacherId,
      classroomId,
    } = request;

    const classModel = new Class({
      subject,
      initialDay,
      endDay,
      initialTimeClass,
      endTimeClass,
      dayOfTheWeek,
    });

    const classCreated = await this.classRepository.create(
      classModel,
      teacherId,
      classroomId,
    );

    return { classCreated };
  }
}
