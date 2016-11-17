export enum CategoryStatus
{
  unknown = 0,
  ok = 1,
  warning = 2,
  problem = 3
}

export class Category {
  public status: CategoryStatus = CategoryStatus.unknown;
  public message: string = "";
  constructor(public name: string)
  {
  }
}
