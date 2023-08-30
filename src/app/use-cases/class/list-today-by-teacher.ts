import { Class } from '@app/entities/class';
import { ClassRepository } from '@app/repositories/class-repository';
import { Injectable } from '@nestjs/common';
import { getDay } from 'date-fns';
import { DateTime } from 'luxon';

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

    const currentUTC = DateTime.utc();
    const brasiliaTime = currentUTC.setZone('America/Sao_Paulo');
    const dateObject: Date = brasiliaTime.toJSDate();
    const dayOfWeek = getDay(dateObject) - 1; // Obtém o dia da semana (0 = domingo, 1 = segunda, ..., 6 = sábado)

    const classes =
      await this.classRepository.listAllClassFromTeacherIdFromToday(
        teacherId,
        dayOfWeek,
      );

    return { classes };
  }
}
