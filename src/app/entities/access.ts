import { User } from './User';

export interface AccessProps {
  id?: string;
  user: User;
  code?: string;
  accessType: string;
  openTime: Date;
  closeTime: Date;
  classroomId?: string;
}

export class Access {
  private props: AccessProps;

  constructor(props: AccessProps) {
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

  public get user(): User {
    return this.props.user;
  }

  public set user(user: User) {
    this.props.user = user;
  }

  public get code(): string {
    return this.props.code;
  }

  public set code(code: string) {
    this.props.code = code;
  }

  public get accessType(): string {
    return this.props.accessType;
  }

  public set accessType(accessType: string) {
    this.props.accessType = accessType;
  }

  public get openTime(): Date {
    return this.props.openTime;
  }

  public set openTime(openTime: Date) {
    this.props.openTime = openTime;
  }

  public get closeTime(): Date {
    return this.props.closeTime;
  }

  public set closeTime(closeTime: Date) {
    this.props.closeTime = closeTime;
  }

  public get classroomId(): string {
    return this.props.classroomId;
  }

  public set classroomId(classroomId: string) {
    this.props.classroomId = classroomId;
  }
}
