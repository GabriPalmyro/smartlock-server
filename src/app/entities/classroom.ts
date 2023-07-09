import { Access } from './Access';
import { Class } from './Class';
import { Lock } from './Lock';
import { TemporaryCode } from './temporary-code';

export interface ClassroomProps {
  id?: string;
  name: string;
  block: string;
  classes?: Class[];
  lock?: Lock;
  temporaryCodes?: TemporaryCode[];
  access?: Access[];
}

export class Classroom {
  private props: ClassroomProps;

  constructor(props: ClassroomProps) {
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

  public get block(): string {
    return this.props.block;
  }

  public set block(block: string) {
    this.props.block = block;
  }

  public get classes(): Class[] {
    return this.props.classes;
  }

  public set classes(classes: Class[]) {
    this.props.classes = classes;
  }

  public get lock(): Lock | undefined {
    return this.props.lock;
  }

  public set lock(lock: Lock | undefined) {
    this.props.lock = lock;
  }

  public get temporaryCodes(): TemporaryCode[] {
    return this.props.temporaryCodes;
  }

  public set temporaryCodes(temporaryCodes: TemporaryCode[]) {
    this.props.temporaryCodes = temporaryCodes;
  }

  public get access(): Access[] {
    return this.props.access;
  }

  public set access(access: Access[]) {
    this.props.access = access;
  }
}
