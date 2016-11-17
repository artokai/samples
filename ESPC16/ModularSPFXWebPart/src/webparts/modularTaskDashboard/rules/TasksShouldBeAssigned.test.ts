import * as assert from 'assert';

import * as rules from './';
import {CategoryStatus} from '../TaskCategory';
import {ITask} from '../providers';

describe('Rules: TasksShouldBeAssigned', () => {

  it('no tasks --> ok', () => {
    const tasks: ITask[] = [];
    const result = rules.TasksShouldBeAssigned(tasks);
    assert.equal(result.status, CategoryStatus.ok);
  });

  it('single null assignment --> warning', () => {
    const tasks: ITask[] = [
      {category: "Other", status: "Not Started", assignedToId: 1, dueDate: null },
      {category: "Other", status: "Not Started", assignedToId: null, dueDate: null },
      {category: "Other", status: "Not Started", assignedToId: 2, dueDate: null },
    ];
    const result = rules.TasksShouldBeAssigned(tasks);
    assert.equal(result.status, CategoryStatus.warning);
    assert.notEqual(result.message, "");
  });

  it('zero assignment --> warning', () => {
    const tasks: ITask[] = [
      {category: "Other", status: "Not Started", assignedToId: 0, dueDate: null },
    ];
    const result = rules.TasksShouldBeAssigned(tasks);
    assert.equal(result.status, CategoryStatus.warning);
    assert.notEqual(result.message, "");
  });

  it('all assigned --> ok', () => {
    const tasks: ITask[] = [
      {category: "Other", status: "Not Started", assignedToId: 1, dueDate: null },
      {category: "Other", status: "Not Started", assignedToId: 2, dueDate: null },
      {category: "Other", status: "Not Started", assignedToId: 3, dueDate: null },
    ];
    const result = rules.TasksShouldBeAssigned(tasks);
    assert.equal(result.status, CategoryStatus.ok);
  });

});
