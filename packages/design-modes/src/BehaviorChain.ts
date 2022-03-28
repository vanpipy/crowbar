type Processor = (value?: any) => Promise<any> | any;

class BehaviorChain {
  private queues: Processor[] = [];

  push(processor: Processor) {
    return this.queues.push(processor);
  }

  execute() {
    const run = createRunner(this.queues);
    return run();
  }

  destroy() {
    this.queues.length = 0
  }
}

function createRunner (processors: Processor[]) {
  let result: any;
  const gen = runner();

  function *runner() {
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

  function run(): any {
    const { done, value } = gen.next();

    if (value instanceof Error) {
      return Promise.reject(value);
    }

    if (done === true) {
      return Promise.resolve(result);
    }

    return Promise.resolve(value).then((latest) => {
      if (done === false) {
        result = latest;
        return run();
      }
    })
  }

  return run;
}

export default BehaviorChain;
