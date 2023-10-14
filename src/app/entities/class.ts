import { Classroom } from './classroom';
import { User } from './user';

export interface ClassProps {
  id?: string;
  subject: string;
  name?: string;
  dayOfTheWeek: number;
  initialDay: Date;
  endDay: Date;
  initialTimeClass: Date;
  endTimeClass: Date;
  teacher?: User;
  classroom?: Classroom;
}

export class Class {
  private props: ClassProps;

  constructor(props: ClassProps) {
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

  public get subject(): string {
    return this.props.subject;
  }

  public set subject(subject: string) {
    this.props.subject = subject;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
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
    return this.props.initialTimeClass;
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

  public get teacher(): User {
    return this.props.teacher;
  }

  public set teacher(teacher: User) {
    this.props.teacher = teacher;
  }

  public get classroom(): Classroom | undefined {
    return this.props.classroom;
  }

  public set classroom(classroom: Classroom | undefined) {
    this.props.classroom = classroom;
  }
}
