export interface LockProps {
  id?: string;
  name: string;
  state: boolean;
  classroomId?: number;
}

export class Lock {
  private props: LockProps;

  constructor(props: LockProps) {
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

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get state(): boolean {
    return this.props.state;
  }

  public set state(state: boolean) {
    this.props.state = state;
  }

  public get classroomId(): number {
    return this.props.classroomId;
  }

  public set classroomId(classroomId: number) {
    this.props.classroomId = classroomId;
  }
}
