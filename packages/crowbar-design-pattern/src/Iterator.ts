type node<T> = T;

/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * The iterator has lots of the implementations, it depends on the the requirement.
 * But the API should be stable.
 */
class Iterator {
  hasMore() {}
  next() {}
}

class ArrayIterator<T> extends Iterator {
  private readonly nodes: node<T>[];
  private current: number;
  private max: number;

  constructor(nodes: node<T>[]) {
    super();
    this.nodes = nodes;
    this.max = nodes.length;
    this.current = -1;
  }

  hasMore(): boolean {
    return this.current + 1 < this.max;
  }

  next(): node<T> | null {
    if (this.hasMore()) {
      this.current += 1;
      return this.nodes[this.current];
    }

    return null;
  }
}

export { ArrayIterator };
export default Iterator;
