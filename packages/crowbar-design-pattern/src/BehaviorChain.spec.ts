import BehaviorChain from './BehaviorChain';
import { expect } from 'chai';

describe('BehaviorChain', () => {
  it('iterate the queue of the sync functions', async () => {
    const a = () => 10;
    const b = (x: any) => x * 2;
    const c = (x: any) => x + 10;

    const chain = new BehaviorChain();
    chain.push(a);
    chain.push(b);
    chain.push(c);

    const actul = await chain.execute();
    expect(actul).to.eq(30);
  });

  it('iterate the queue of the async functions', async () => {
    const a = async () => 10;
    const b = async (x: any) => x * 2;
    const c = async (x: any) => x + 10;

    const chain = new BehaviorChain();
    chain.push(a);
    chain.push(b);
    chain.push(c);

    const actul = await chain.execute();
    expect(actul).to.eq(30);
  });

  it('iterate the queue of the mixed functions', async () => {
    const a = async () => 10;
    const b = (x: any) => x * 2;
    const c = async (x: any) => x + 10;
    const d = (x: any) => x * 10;

    const chain = new BehaviorChain();
    chain.push(a);
    chain.push(b);
    chain.push(c);
    chain.push(d);

    const actul = await chain.execute();
    expect(actul).to.eq(300);
  });

  it('iterate the queue of the sync functions and paused and throw the expected error', async () => {
    const a = () => 10;
    const b = () => {
      throw Error('blocked');
    };
    const c = (x: any) => x + 10;

    const chain = new BehaviorChain();
    chain.push(a);
    chain.push(b);
    chain.push(c);

    try {
      await chain.execute();
    } catch (err: any) {
      expect(err?.message).to.eq('blocked');
    }
  });

  it('iterate the queue of the async functions and paused with throwing the expected error', async () => {
    const a = async () => 10;
    const b = async () => {
      throw Error('blocked');
    };
    const c = async (x: any) => x + 10;

    const chain = new BehaviorChain();
    chain.push(a);
    chain.push(b);
    chain.push(c);

    try {
      await chain.execute();
    } catch (err: any) {
      expect(err?.message).to.eq('blocked');
    }
  });

  it('iterate the queue of the mixed functions and paused with throwing the expected error', async () => {
    const a = () => 10;
    const b = async () => {
      throw Error('blocked');
    };
    const c = (x: any) => x + 10;

    const chain = new BehaviorChain();
    chain.push(a);
    chain.push(b);
    chain.push(c);

    try {
      await chain.execute();
    } catch (err: any) {
      expect(err?.message).to.eq('blocked');
    }
  });

  it('iterate the queue and end with the break signal directly', async () => {
    let i = 0;

    const a = async () => {
      i += 1;
    };
    const b = () => {
      i += 2;
    };
    const c = () => {
      return 'BREAK_SIGNAL';
    };
    const d = () => {
      i += 3;
    };

    const main = async () => {
      const chain = new BehaviorChain();

      chain.push(a);
      chain.push(b);
      chain.push(c);
      chain.push(d);

      await chain.execute();
      i += 4;
    };

    await main();

    expect(i).to.eq(7);
  });

  it('iterate the queue and destroy the queue after executed', async () => {
    let i = 0;

    const a = () => {
      i += 1;
    };

    const chain = new BehaviorChain();

    chain.push(a);

    await chain.execute();
    await chain.execute();
    await chain.execute();

    expect(i).to.eq(1);
  });
});
