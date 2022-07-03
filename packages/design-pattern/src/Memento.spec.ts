import memo from './Memento';
import { expect } from 'chai';

describe('Memo', () => {
  it('should not change the original function', () => {
    const origin = (x: any) => {
      if (typeof(x) == 'number') {
        return x + 1
      }

      if (typeof(x) == 'string') {
        return `${x} is a string`
      }
    };
    const memonried = memo(origin);

    expect(memonried(0)).to.eq(1)
    expect(memonried('it')).to.eq('it is a string')
    expect(memonried(true)).to.eq(undefined)
  })

  it('should store the values when the function has been executed', () => {
    const A = (x: any) => {
      return x * 10
    };
    const memonried = memo(A);

    memonried(1)
    expect(memonried.__store.get(1)).to.eq(10)
  })
})
