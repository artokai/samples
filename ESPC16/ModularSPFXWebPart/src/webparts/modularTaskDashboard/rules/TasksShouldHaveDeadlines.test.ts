import * as assert from 'assert';

import * as rules from './';
import {CategoryStatus} from '../TaskCategory';
import {ITask} from '../providers';

describe('Rules: TasksShouldHaveDeadlines', () => {

  it('no tasks --> ok', () => {
    const tasks: ITask[] = [];
    const result = rules.TasksShouldHaveDeadlines(tasks);
    assert.equal(result.status, CategoryStatus.ok);
  });

  it('null dueDate --> warning', () => {
    const tasks: ITask[] = [
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: null },
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: new Date(Date.now()+1) },
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: null },
    ];
    const result = rules.TasksShouldHaveDeadlines(tasks);
    assert.equal(result.status, CategoryStatus.warning);
    assert.notEqual(result.message, "");
  });

  it('dueDate set --> ok', () => {
    const tasks: ITask[] = [
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: new Date(Date.now()+1) },
    ];
    const result = rules.TasksShouldHaveDeadlines(tasks);
    assert.equal(result.status, CategoryStatus.ok);
  });
});
