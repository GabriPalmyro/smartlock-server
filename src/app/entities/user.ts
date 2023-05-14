export interface UserProps {
  id?: number;
  name: string;
  email: string;
  password: string;
  teacherCode: string;
  userTypeId: number;
  createdAt?: Date;
  updateAt?: Date;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id(): number | undefined {
    return this.props.id;
  }

  set id(value: number | undefined) {
    this.props.id = value;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get password(): string {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
  }

  get teacherCode(): string {
    return this.props.teacherCode;
  }

  set teacherCode(value: string) {
    this.props.teacherCode = value;
  }

  get userTypeId(): number {
    return this.props.userTypeId;
  }

  set userTypeId(value: number) {
    this.props.userTypeId = value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  get updatedAt(): Date {
    return this.props.updateAt;
  }

  set updatedAt(value: Date) {
    this.props.updateAt = value;
  }
}
