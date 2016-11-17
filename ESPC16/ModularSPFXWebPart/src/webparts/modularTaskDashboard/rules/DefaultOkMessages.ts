import {ITask} from '../providers';
import {CategoryStatus} from '../TaskCategory';
import {IRuleResult} from '../RuleProcessor';

export function DefaultOkMessages(tasks: ITask[]): IRuleResult
{
  if (!tasks || tasks.length <= 0)
    return {status: CategoryStatus.ok, message: "Nothing to do, enjoy!" };
  else
    return {status: CategoryStatus.ok, message: "Progressing as planned..." };
}
