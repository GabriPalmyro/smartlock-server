import { Access } from './access';
import { Class } from './class';
import { User } from './user';

export interface TeacherProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  code: string;
  userTypeId: string;
  createdAt?: Date;
  updateAt?: Date;
  class: Class[];
  access: Access[];
}

export class Teacher extends User {
  private teacherProps: TeacherProps;

  constructor(props: TeacherProps) {
    super(props);
    this.teacherProps = props;
  }

  get class(): Class[] {
    return this.teacherProps.class;
  }

  set class(value: Class[]) {
    this.teacherProps.class = value;
  }

  get access(): Access[] {
    return this.teacherProps.access;
  }

  set access(value: Access[]) {
    this.teacherProps.access = value;
  }
}
