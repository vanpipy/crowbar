export type Value = any;
export type Processor = (values?: Value) => Promise<Value> | Value;

class Command {
  private processor: Processor = async () => {};

  constructor(processor: Processor) {
    this.processor = processor;
  }

  execute = (v?: Value) => {
    return this.processor(v);
  }
}

export default Command;
