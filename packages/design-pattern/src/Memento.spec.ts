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
})
