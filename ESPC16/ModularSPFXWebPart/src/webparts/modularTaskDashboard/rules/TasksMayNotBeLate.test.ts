import * as assert from 'assert';

import * as rules from './';
import {CategoryStatus} from '../TaskCategory';
import {ITask} from '../providers';

describe('Rules: TasksMayNotBeLate', () => {

  it('no tasks --> ok', () => {
    const tasks: ITask[] = [];
    const result = rules.TasksMayNotBeLate(tasks);
    assert.equal(result.status, CategoryStatus.ok);
  });

  it('null dueDate --> ok', () => {
    const tasks: ITask[] = [
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: null },
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: null },
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: null },
    ];
    const result = rules.TasksMayNotBeLate(tasks);
    assert.equal(result.status, CategoryStatus.ok);
  });

  it('future dueDate --> ok', () => {
    const tasks: ITask[] = [
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: new Date(Date.now()+1) },
    ];
    const result = rules.TasksMayNotBeLate(tasks);
    assert.equal(result.status, CategoryStatus.ok);
  });

  it('past dueDate --> problem', () => {
    const tasks: ITask[] = [
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: new Date(Date.now()-1) },
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: new Date(Date.now()+1) },
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: null },
    ];
    const result = rules.TasksMayNotBeLate(tasks);
    assert.equal(result.status, CategoryStatus.problem);
    assert.notEqual(result.message, "");
  });

});
