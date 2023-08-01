import { Classroom } from './Classroom';

export interface LockProps {
  id?: string;
  name: string;
  state: boolean;
  classroom?: Classroom;
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

  public get classroom(): Classroom {
    return this.props.classroom;
  }

  public set classroom(classroom: Classroom) {
    this.props.classroom = classroom;
  }
}
