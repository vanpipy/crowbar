import { expect, jest } from '@jest/globals';
import Observer, { Subscriber } from './Observer';

describe('Observer', () => {
  const test = jest.fn();

  class Demo implements Subscriber {
    update() {
      test();
    }
  }

  const A = new Demo();
  const observer = new Observer();

  it('should subscribe an event successfully', () => {
    observer.subscribe('test', A);
    observer.notify('test');
    expect(test).toHaveBeenCalledTimes(1);
  });

  it('should subscribe multiple events successfully', () => {
    const B = new Demo();
    observer.subscribe('test', B);
    observer.notify('test');
    expect(test).toHaveBeenCalledTimes(3);
  });

  it('should not subscribe the same subscriber again', () => {
    observer.subscribe('test', A);
    observer.notify('test');
    expect(test).toHaveBeenCalledTimes(5);
  });

  it('should unsubscribe an event successfully', () => {
    observer.unsubscribe('test', A);
    observer.notify('test');
    expect(test).toHaveBeenCalledTimes(6);
  });
});
