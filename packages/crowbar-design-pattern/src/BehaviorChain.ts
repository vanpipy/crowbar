import Command, { Processor, Value } from './Command';

export const BREAK_SIGNAL = 'BREAK_SIGNAL';

class BehaviorChain {
  private queues: Command[] = [];

  push(processor: Processor) {
    const command = new Command(processor);
    return this.queues.push(command);
  }

  execute() {
    if (this.queues.length) {
      const run = createRunner(this.queues, this.destroy.bind(this));
      return run();
    }
  }

  destroy() {
    this.queues.length = 0;
  }
}

function createRunner(commands: Command[], destroy: () => void) {
  let result: Value;
  const gen = runner();

  function* runner() {
    const l = commands.length;
    let i = 0;

    while (i < l) {
      const command = commands[i];

      try {
        yield command.execute(result);
      } catch (err) {
        yield err;
      }

      i += 1;
    }
  }

  function run(): Promise<Value> {
    const { done, value } = gen.next();

    if (value === BREAK_SIGNAL) {
      destroy();
      return Promise.resolve(BREAK_SIGNAL);
    }

    if (value instanceof Error) {
      destroy();
      return Promise.reject(value);
    }

    if (done === true) {
      destroy();
      return Promise.resolve(result);
    }

    return Promise.resolve(value).then((latest) => {
      if (done === false) {
        result = latest as Value;
        return run();
      }
    });
  }

  return run;
}

export default BehaviorChain;
