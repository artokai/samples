import {ITask} from '../providers';
import {CategoryStatus} from '../TaskCategory';
import {processAllTasks} from './RuleHelpers';
import {IRuleResult} from '../RuleProcessor';

export function TasksShouldHaveDeadlines(tasks: ITask[]): IRuleResult
{
  return processAllTasks(tasks, (task) => {
    const status =  (!task.dueDate) ? CategoryStatus.warning : CategoryStatus.ok;
    const message =  (status > CategoryStatus.ok) ? "Tasks should have deadlines." : "";
    return {status: status, message: message };
  });
}