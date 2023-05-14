export interface AccessProps {
  id?: number;
  userId: number;
  code?: number;
  accessType: string;
  openTime: Date;
  closeTime: Date;
  classroomId?: number;
}

export class Access {
  private props: AccessProps;

  constructor(props: AccessProps) {
    this.props = {
      ...props,
    };
  }

  public get id(): number {
    return this.props.id;
  }

  public set id(id: number) {
    this.props.id = id;
  }

  public get user(): number {
    return this.props.userId;
  }

  public set user(user: number) {
    this.props.userId = user;
  }

  public get code(): number {
    return this.props.code;
  }

  public set code(code: number) {
    this.props.code = code;
  }

  public get accessType(): string {
    return this.props.accessType;
  }

  public set accessType(accessType: string) {
    this.props.accessType = accessType;
  }

  public get closeTime(): Date {
    return this.props.closeTime;
  }

  public set closeTime(closeTime: Date) {
    this.props.closeTime = closeTime;
  }

  public get classroomId(): number {
    return this.props.classroomId;
  }

  public set classroomId(classroomId: number) {
    this.props.classroomId = classroomId;
  }
}
