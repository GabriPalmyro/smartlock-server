import { Class } from '@app/entities/class';
import { ClassRepository } from '@app/repositories/class-repository';
import { Injectable } from '@nestjs/common';

interface CreateClassRequest {
  name;
  subject: string;
  initialDay: Date;
  endDay: Date;
  initialTimeClass: Date;
  endTimeClass: Date;
  dayOfTheWeek: number;
  teacherId: string | null;
  classroomId: string | null;
}

interface CreateClassResponse {
  classCreated: Class;
}

@Injectable()
export class CreateClass {
  constructor(private classRepository: ClassRepository) {}

  async execute(request: CreateClassRequest): Promise<CreateClassResponse> {
    const {
      name,
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
      name: name,
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
