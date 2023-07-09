import { Class } from '@app/entities/class';
import { ClassRepository } from '@app/repositories/class-repository';
import { Injectable } from '@nestjs/common';
import { getDay } from 'date-fns';

interface ListClassFromTodayByTeacherRequest {
  teacherId: string;
}

interface ListClassFromTodayByTeacherResponse {
  classes: Class[];
}

@Injectable()
export class ListClassFromTodayByTeacher {
  constructor(private classRepository: ClassRepository) {}

  async execute(
    request: ListClassFromTodayByTeacherRequest,
  ): Promise<ListClassFromTodayByTeacherResponse> {
    const { teacherId } = request;

    const today = new Date();
    const dayOfWeek = getDay(today); // Obtém o dia da semana (0 = domingo, 1 = segunda, ..., 6 = sábado)

    const classes =
      await this.classRepository.listAllClassFromTeacherIdFromToday(
        teacherId,
        dayOfWeek,
      );

    return { classes };
  }
}
