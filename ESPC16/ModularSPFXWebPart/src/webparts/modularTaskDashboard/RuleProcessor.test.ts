import * as assert from 'assert';

import {ITask} from './providers';
import {RuleProcessor} from './RuleProcessor';
import {CategoryStatus} from './TaskCategory';

describe('RuleProcessor', () => {

  it("no rules --> unknown", () => {
    const mocktasks: ITask[] = [];
    const processor = new RuleProcessor();
    const result = processor.process(mocktasks);
    assert.equal(result.status, CategoryStatus.unknown);
  });

  it("highest scoring rule wins", () => {
    const mocktasks: ITask[] = [];
    const processor = new RuleProcessor();
    processor.addRule((tasks: ITask[]) => { return  {status: CategoryStatus.ok, message: "ok" }; });
    processor.addRule((tasks: ITask[]) => { return  {status: CategoryStatus.problem, message: "problem" }; });
    processor.addRule((tasks: ITask[]) => { return  {status: CategoryStatus.warning, message: "warning" }; });
    const result = processor.process(mocktasks);

    assert.equal(result.status, CategoryStatus.problem, "wrong status");
    assert.equal(result.message, "problem", "wrong message");
  });

  it("order of the rules dictates the message", () => {
    const mocktasks: ITask[] = [];
    const processor = new RuleProcessor();
    processor.addRule((tasks: ITask[]) => { return  {status: CategoryStatus.ok, message: "ok" }; });
    processor.addRule((tasks: ITask[]) => { return  {status: CategoryStatus.ok, message: "some other message" }; });
    const result = processor.process(mocktasks);

    assert.equal(result.message, "ok", "wrong message");
  });

});
