import { Class } from '@app/entities/class';
import { ClassRepository } from '@app/repositories/class-repository';
import { Injectable } from '@nestjs/common';

interface UpdateClassRequest {
  id: string;
  subject: string;
  initialDay: Date;
  endDay: Date;
  initialTimeClass: Date;
  endTimeClass: Date;
  dayOfTheWeek: number;
  teacherId: string | null;
  classroomId: string | null;
}

@Injectable()
export class UpdateClass {
  constructor(private classRepository: ClassRepository) {}

  async execute(request: UpdateClassRequest): Promise<void> {
    const {
      id,
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
      id,
      subject,
      initialDay,
      endDay,
      initialTimeClass,
      endTimeClass,
      dayOfTheWeek,
    });

    await this.classRepository.update(classModel, teacherId, classroomId);
  }
}
