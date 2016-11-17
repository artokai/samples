import {ITask} from './providers';
import {CategoryStatus} from './TaskCategory';

export interface IRule {
    (tasks: ITask[]): IRuleResult;
}

export interface IRuleResult {
  status: CategoryStatus;
  message?: string;
}

export class RuleProcessor
{
  protected rules: IRule[] = [];

  public process(tasks: ITask[]): IRuleResult {
    return this.rules.reduce<IRuleResult>(
      (current, rule) => {
        const ruleResult = rule(tasks);
        return (ruleResult.status > current.status) ? ruleResult : current;
      },
      {status: CategoryStatus.unknown, message: "" }
    );
  }

  public addRule(rule: IRule) {
    this.rules.push(rule);
  }
}