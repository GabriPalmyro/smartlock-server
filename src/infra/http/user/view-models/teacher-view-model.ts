import { Teacher } from '@app/entities/teacher';
import { ClassViewModel } from '@infra/http/class/view-models/class-view-model';

export class TeacherViewModel {
  static toHTTP(user: Teacher) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      code: user.code,
      created_at: user.createdAt,
      classes:
        user.class != null && user.class.length > 0
          ? user.class.map(ClassViewModel.toHTTPWithoutTeacher)
          : null,
    };
  }
}
