import {ArrayIterator} from "./Iterator";
import {expect} from "chai";

describe('Iterator', () => {
  it('should iterate an array which the length is greater than zero', () => {
    const arr = [0,1,2,3,4]
    const iterator = new ArrayIterator(arr)

    expect(iterator.hasMore()).to.eq(true)
    expect(iterator.getNext()).to.eq(0)
    expect(iterator.hasMore()).to.eq(true)
    expect(iterator.getNext()).to.eq(1)
    expect(iterator.hasMore()).to.eq(true)
    expect(iterator.getNext()).to.eq(2)
    expect(iterator.hasMore()).to.eq(true)
    expect(iterator.getNext()).to.eq(3)
    expect(iterator.hasMore()).to.eq(true)
    expect(iterator.getNext()).to.eq(4)
  })

  it('should iterate an empty array and hasMore retrun false and getNext retrun null', () => {
    const arr: any[] = [];
    const iterator = new ArrayIterator(arr);

    expect(iterator.hasMore()).to.eq(false)
    expect(iterator.getNext()).to.eq(null)
  })

  it('should iterate an array but get null when reach the index is out of the edge', () => {
    const arr = [0];
    const iterator = new ArrayIterator(arr);

    expect(iterator.hasMore()).to.eq(true)
    expect(iterator.getNext()).to.eq(0)
    expect(iterator.hasMore()).to.eq(false)
  })
});
