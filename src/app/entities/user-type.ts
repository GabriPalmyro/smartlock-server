export interface UserTypeProps {
  id?: string;
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

  public get id(): string {
    return this.props.id;
  }

  public set id(id: string) {
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
