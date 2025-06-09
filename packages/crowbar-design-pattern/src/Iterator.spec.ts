import { expect } from '@jest/globals';
import { ArrayIterator } from './Iterator';

describe('Iterator', () => {
  it('should iterate an array which the length is greater than zero', () => {
    const arr = [0, 1, 2, 3, 4];
    const iterator = new ArrayIterator(arr);

    expect(iterator.hasMore()).toEqual(true);
    expect(iterator.next()).toEqual(0);
    expect(iterator.hasMore()).toEqual(true);
    expect(iterator.next()).toEqual(1);
    expect(iterator.hasMore()).toEqual(true);
    expect(iterator.next()).toEqual(2);
    expect(iterator.hasMore()).toEqual(true);
    expect(iterator.next()).toEqual(3);
    expect(iterator.hasMore()).toEqual(true);
    expect(iterator.next()).toEqual(4);
  });

  it('should iterate an empty array and hasMore retrun false and getNext retrun null', () => {
    const arr: any[] = [];
    const iterator = new ArrayIterator(arr);

    expect(iterator.hasMore()).toEqual(false);
    expect(iterator.next()).toEqual(null);
  });

  it('should iterate an array but get null when reach the index is out of the edge', () => {
    const arr = [0];
    const iterator = new ArrayIterator(arr);

    expect(iterator.hasMore()).toEqual(true);
    expect(iterator.next()).toEqual(0);
    expect(iterator.hasMore()).toEqual(false);
  });
});
