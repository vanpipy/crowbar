import Observer, { Subscriber } from './Observer';
import sinon from 'sinon';
import { expect } from 'chai';

describe('Observer', () => {
  const test = sinon.spy();

  class Demo implements Subscriber {
    update() {
      test()
    }
  }

  const A = new Demo();
  const observer = new Observer();

  it('should subscribe an event successfully', () => {
    observer.subscribe('test', A)
    observer.notify('test')
    expect(test.callCount).to.eq(1)
  })

  it('should subscribe multiple events successfully', () => {
    const B = new Demo();
    observer.subscribe('test', B)
    observer.notify('test')
    expect(test.callCount).to.eq(3)
  })

  it('should not subscribe the same subscriber again', () => {
    observer.subscribe('test', A)
    observer.notify('test')
    expect(test.callCount).to.eq(5)
  })

  it('should unsubscribe an event successfully', () => {
    observer.unsubscribe('test', A)
    observer.notify('test')
    expect(test.callCount).to.eq(6)
  })
})
