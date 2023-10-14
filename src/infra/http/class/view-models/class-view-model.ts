import { Class } from '@app/entities/class';
import { ClassroomViewModel } from '@infra/http/classroom/view-models/classroom-view-model';
import { UserViewModel } from '@infra/http/user/view-models/user-view-model';

export class ClassViewModel {
  static toHTTPWithoutTeacher(classModel: Class) {
    return {
      id: classModel.id,
      subject: classModel.subject,
      dayOfTheWeek: classModel.dayOfTheWeek,
      initialDay: classModel.initialDay,
      endDay: classModel.endDay,
      initialTimeClass: classModel.initialTimeClass,
      endTimeClass: classModel.endTimeClass,
      teacher: UserViewModel.toHTTP(classModel.teacher),
      classroom: ClassroomViewModel.toHTTP(classModel.classroom),
    };
  }

  static toHTTP(classModel: Class) {
    return {
      id: classModel.id,
      subject: classModel.subject,
      dayOfTheWeek: classModel.dayOfTheWeek,
      initialDay: classModel.initialDay,
      endDay: classModel.endDay,
      initialTimeClass: classModel.initialTimeClass,
      endTimeClass: classModel.endTimeClass,
      teacher: UserViewModel.toHTTP(classModel.teacher),
      classroom: ClassroomViewModel.toHTTP(classModel.classroom),
    };
  }
}
