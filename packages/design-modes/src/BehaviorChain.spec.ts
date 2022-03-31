import BehaviorChain from './BehaviorChain';
import { expect } from 'chai';

it('iterate the queue of the sync functions', async () => {
  const a = () => 10;
  const b = (x: number) => x * 2;
  const c = (x: number) => x + 10;

  const chain = new BehaviorChain();
  chain.push(a);
  chain.push(b);
  chain.push(c);

  const actul = await chain.execute();
  expect(actul).to.eq(30);
});

it('iterate the queue of the async functions', async () => {
  const a = async () => 10;
  const b = async (x: number) => x * 2;
  const c = async (x: number) => x + 10;

  const chain = new BehaviorChain();
  chain.push(a);
  chain.push(b);
  chain.push(c);

  const actul = await chain.execute();
  expect(actul).to.eq(30);
})

it('iterate the queue of the mixed functions', async () => {
  const a = async () => 10;
  const b = (x: number) => x * 2;
  const c = async (x: number) => x + 10;
  const d = (x: number) => x * 10;

  const chain = new BehaviorChain();
  chain.push(a);
  chain.push(b);
  chain.push(c);
  chain.push(d);

  const actul = await chain.execute();
  expect(actul).to.eq(300);
})

it('iterate the queue of the sync functions and paused and throw the expected error', async () => {
  const a = () => 10;
  const b = () => {
    throw Error('blocked');
  };
  const c = (x: number) => x + 10;

  const chain = new BehaviorChain();
  chain.push(a);
  chain.push(b);
  chain.push(c);

  try {
    await chain.execute();
  } catch (err: any) {
    expect(err.message).to.eq('blocked');
  }
});

it('iterate the queue of the async functions and paused and throw the expected error', async () => {
  const a = async () => 10;
  const b = async () => {
    throw Error('blocked');
  };
  const c = async (x: number) => x + 10;

  const chain = new BehaviorChain();
  chain.push(a);
  chain.push(b);
  chain.push(c);

  try {
    await chain.execute();
  } catch (err: any) {
    expect(err.message).to.eq('blocked');
  }
});

it('iterate the queue of the mixed functions and paused and throw the expected error', async () => {
  const a = () => 10;
  const b = async () => {
    throw Error('blocked');
  };
  const c = (x: number) => x + 10;

  const chain = new BehaviorChain();
  chain.push(a);
  chain.push(b);
  chain.push(c);

  try {
    await chain.execute()
  } catch (err: any) {
    expect(err.message).to.eq('blocked')
  }
})
