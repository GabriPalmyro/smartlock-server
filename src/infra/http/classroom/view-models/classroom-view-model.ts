import { Classroom } from '@app/entities/classroom';

export class ClassroomViewModel {
  static toHTTP(classroom: Classroom) {
    return {
      id: classroom.id,
      block: classroom.block,
      name: classroom.name,
      access:
        classroom.access != null
          ? classroom.access.map((value) => {
              return {
                id: value.id,
                access_type: value.accessType,
                code: value.code,
              };
            })
          : [],
    };
  }
}
