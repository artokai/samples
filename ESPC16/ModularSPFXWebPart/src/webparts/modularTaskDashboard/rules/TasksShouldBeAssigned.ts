import {ITask} from '../providers';
import {CategoryStatus} from '../TaskCategory';
import {processAllTasks} from './RuleHelpers';
import {IRuleResult} from '../RuleProcessor';

export function TasksShouldBeAssigned(tasks: ITask[]): IRuleResult
{
  return processAllTasks(tasks, (task) => {
    const status =  (!task.assignedToId || task.assignedToId <= 0) ? CategoryStatus.warning : CategoryStatus.ok;
    const message =  (status > CategoryStatus.ok) ? "All tasks should be assigned to someone." : "";
    return {status: status, message: message };
  });
}
