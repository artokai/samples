import {ITask} from '../providers';
import {CategoryStatus} from '../TaskCategory';
import {processAllTasks} from './RuleHelpers';
import {IRuleResult} from '../RuleProcessor';

export function TasksMayNotBeLate(tasks: ITask[]): IRuleResult
{
  return processAllTasks(tasks, (task) => {
    var now = new Date();

    const status =  (task.dueDate && task.dueDate < now) ? CategoryStatus.problem : CategoryStatus.ok;
    const message =  (status > CategoryStatus.ok) ? "Tasks are running late!" : "";

    return {status: status, message: message };
  });
}
