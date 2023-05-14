export interface UserTypeProps {
  id?: number;
  type: string;
  createdAt: Date;
}

export class UserType {
  private props: UserTypeProps;

  constructor(props: UserTypeProps) {
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

  public get type(): string {
    return this.props.type;
  }

  public set type(type: string) {
    this.props.type = type;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
