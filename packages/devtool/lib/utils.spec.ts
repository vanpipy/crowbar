import { expect } from 'chai';
import { createModule } from './utils';

test('create module', () => {
  const script = 'module.exports = x => x * 2';
  const mod = createModule('./test.js', script);
  expect(mod(10)).to.eq(20);
});
