import { Access } from './Access';
import { Classroom } from './Classroom';
import { User } from './User';

export interface TemporaryCodeProps {
  id?: string;
  code: string;
  initialDate: Date;
  endDate: Date;
  classroom?: Classroom;
  user: User;
  access: Access[];
  createdAt: Date;
}

export class TemporaryCode {
  private props: TemporaryCodeProps;

  constructor(props: TemporaryCodeProps) {
    this.props = {
      ...props,
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public set id(id: string) {
    this.props.id = id;
  }

  public get code(): string {
    return this.props.code;
  }

  public set code(code: string) {
    this.props.code = code;
  }

  public get initialDate(): Date {
    return this.props.initialDate;
  }

  public set initialDate(initialDate: Date) {
    this.props.initialDate = initialDate;
  }

  public get endDate(): Date {
    return this.props.endDate;
  }

  public set endDate(endDate: Date) {
    this.props.endDate = endDate;
  }

  public get classroom(): Classroom | undefined {
    return this.props.classroom;
  }

  public set classroom(classroom: Classroom | undefined) {
    this.props.classroom = classroom;
  }

  public get user(): User {
    return this.props.user;
  }

  public set user(user: User) {
    this.props.user = user;
  }

  public get access(): Access[] {
    return this.props.access;
  }

  public set access(access: Access[]) {
    this.props.access = access;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }
}
