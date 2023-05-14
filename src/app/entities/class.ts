export interface ClassProps {
  id?: number;
  subject: string;
  dayOfTheWeek: number;
  initialDay: Date;
  endDay: Date;
  initialTimeClass: Date;
  endTimeClass: Date;
  teacherId: number;
  classroomId: number;
}

export class Class {
  private props: ClassProps;

  constructor(props: ClassProps) {
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

  public get subject(): string {
    return this.props.subject;
  }

  public set subject(subject: string) {
    this.props.subject = subject;
  }

  public get dayOfTheWeek(): number {
    return this.props.dayOfTheWeek;
  }

  public set dayOfTheWeek(dayOfTheWeek: number) {
    this.props.dayOfTheWeek = dayOfTheWeek;
  }

  public get initialDay(): Date {
    return this.props.initialDay;
  }

  public set initialDay(initialDay: Date) {
    this.props.initialDay = initialDay;
  }

  public get endDay(): Date {
    return this.props.endDay;
  }

  public set endDay(endDay: Date) {
    this.props.endDay = endDay;
  }

  public get initialTimeClass(): Date {
    return this.props.endDay;
  }

  public set initialTimeClass(initialTimeClass: Date) {
    this.props.initialTimeClass = initialTimeClass;
  }

  public get endTimeClass(): Date {
    return this.props.endTimeClass;
  }

  public set endTimeClass(endTimeClass: Date) {
    this.props.endTimeClass = endTimeClass;
  }

  public get teacher(): number {
    return this.props.teacherId;
  }

  public set teacher(teacherId: number) {
    this.props.teacherId = teacherId;
  }

  public get classroom(): number {
    return this.props.classroomId;
  }

  public set classroom(classroomId: number) {
    this.props.classroomId = classroomId;
  }
}
