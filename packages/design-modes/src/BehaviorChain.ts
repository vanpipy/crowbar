type AnyObject = { [key: string]: any };
type Mixed =
  | AnyObject
  | AnyObject[]
  | number
  | string
  | boolean
  | number[]
  | string[]
  | boolean[]
  | null
  | undefined
  | void;

type Processor = (value: Mixed) => Promise<Mixed> | Mixed;

export const BREAK_SIGNAL = 'BREAK_SIGNAL';

class BehaviorChain {
  private queues: Processor[] = [];

  push(processor: Processor) {
    return this.queues.push(processor);
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

function createRunner(processors: Processor[], destroy: () => void) {
  let result: Mixed;
  const gen = runner();

  function* runner() {
    const l = processors.length;
    let i = 0;

    while (i < l) {
      const processor = processors[i];

      try {
        yield processor(result);
      } catch (err) {
        yield err;
      }

      i += 1;
    }
  }

  function run(): Promise<Mixed> {
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
        result = latest as Mixed;
        return run();
      }
    });
  }

  return run;
}

export default BehaviorChain;
