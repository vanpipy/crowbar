import { expect } from '@jest/globals';
import memo from './Memento';

describe('Memo', () => {
  it('should not change the original function', () => {
    const origin = (x: any) => {
      if (typeof x == 'number') {
        return x + 1;
      }

      if (typeof x == 'string') {
        return `${x} is a string`;
      }
    };
    const memonried = memo(origin);

    expect(memonried(0)).toEqual(1);
    expect(memonried('it')).toEqual('it is a string');
    expect(memonried(true)).toEqual(undefined);
  });

  it('should store the values when the function has been executed', () => {
    const A = (x: any) => {
      return x * 10;
    };
    const memonried = memo(A);

    memonried(1);
    expect(memonried.__store.get(1)).toEqual(10);
  });
});
