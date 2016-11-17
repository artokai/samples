import {ITask, ITaskProvider} from '../providers';

export class MockTaskProvider implements ITaskProvider
{
  public mockTasks: ITask[];

  constructor() {
    this.mockTasks = [];
    for (let i = 0; i < 4; i++) {
      this.mockTasks.push({ category : "Development", status: "Not Started", assignedToId: null, dueDate: null });
    }
    this.mockTasks.push({ category : "Specifications", status: "Not Started", assignedToId: 1, dueDate: new Date(Date.now() - 3600) });
    this.mockTasks.push({ category : "Testing", status: "Not Started", assignedToId: 1, dueDate: null });
    this.mockTasks.push({ category : "Training", status: "Not Started", assignedToId: 1, dueDate: new Date(Date.now() + 3600) });

    this.mockTasks.push({ category : "Other", status: "Not Started", assignedToId: 1, dueDate: null });
    this.mockTasks.push({ category : "Other", status: "Not Started", assignedToId: null, dueDate: new Date(Date.now() + 3600) });


  }

  public getTasks(): Promise<ITask[]>
  {
    return new Promise<ITask[]>((resolve, reject) => {
      setTimeout(() => { resolve(this.mockTasks); }, 500);
    });
  }
}
