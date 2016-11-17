import {ITask} from '../providers';
import {CategoryStatus} from '../TaskCategory';
import {IRuleResult} from '../RuleProcessor';

export function processAllTasks(tasks:ITask[], rule: (task:ITask) => IRuleResult) : IRuleResult
{
  if (!tasks || tasks.length <= 0)
    return {status: CategoryStatus.ok, message: "" };

  return tasks.reduce<IRuleResult>(
    (current, item) => {
      const ruleResult = rule(item);
      return (ruleResult.status > current.status) ? ruleResult : current;
    },
    {status: CategoryStatus.unknown, message: "" }
  );
}