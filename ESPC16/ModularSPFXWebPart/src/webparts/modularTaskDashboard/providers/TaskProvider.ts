import {HttpClient} from '@microsoft/sp-client-base';

export interface ITaskProvider
{
  getTasks(): Promise<ITask[]>;
}

export interface ITask
{
  category: string;
  assignedToId: number;
  dueDate: Date;
  status: string;
}

export class TaskProvider implements ITaskProvider
{
  constructor(private httpClient: HttpClient, protected webAbsoluteUrl: string)
  {
  }

  public getTasks(): Promise<ITask[]>
  {
    const listTitle = "Tasks";
    const fields = "Category,Status,DueDate,AssignedToId";
    const filter = "Status ne 'Completed'";
    const itemLimit = 5000;

    const url = this.webAbsoluteUrl + `/_api/web/lists/getbytitle('${listTitle}')/items?$select=${fields}&$filter=${filter}&$top=${itemLimit}`;

    return this.httpClient.get(url)
      .then ((response: Response) => {
        return response.json();
      })
      .then( (json: any) => {
        return (<any[]> json.value).map(
          (value: any) => {
            return <ITask> {
              category : value.Category,
              assignedToId: value.AssignedToId,
              dueDate: (value.DueDate) ? new Date(value.DueDate) : undefined,
              status: value.Status
            };
          });
      });
  }
}
