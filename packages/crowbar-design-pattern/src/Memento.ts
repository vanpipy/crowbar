/**
 * [Memento](https://refactoring.guru/design-patterns/memento)
 *
 * The memento, also called snapshot, is lots of differences from the memonried function
 *
 * From the cached structure,
 *
 * - the cached data of the memonried function is discrete
 * - the cached data of the memento is continuous
 *
 * From the usage,
 *
 * - the memonried function is only a function to manage the computed results
 * - the memento manages the states across the history of the timeline
 *
 * Most of the time, the snapshot(memento) includes the details and try to restore something
 * about the thing creates the snapshot. So the snapshot is a relationship and connects
 * before and current state
 *
 * Assuming that as below:
 *
 * An editor is able to edit words only, the words changing is continuous on the time. No matter
 * the interval is, here is the continuous indexes:
 *
 * 1, 2, 3, ..., N
 *
 * For index 1, a snapshot created. Same to index 2, 3, ..., n.
 *
 * So example is coming.
 */
class Snapshot {
  private state: string = ''
  private editor: Editor

  constructor(editor: Editor, content: string) {
    this.editor = editor
    this.state = content
  }

  public restore() {
    this.editor.updateText(this.state)
  }
}

class SnapHistory {
  private current: number = 0
  private queue: Snapshot[] = []

  go(step: number) {
    const next = this.current + step;

    if (next < 0) {
      this.current = 0
    }

    if (next > 0 && next < this.queue.length) {
      this.current = next
    }

    if (next > this.queue.length) {
      this.current = this.queue.length - 1
    }

    return this.queue[this.current]
  }

  push(snapshot: Snapshot): void {
    this.queue.push(snapshot)
    this.current = this.queue.length - 1
  }

  pop(): Snapshot | undefined {
    const snapshot = this.queue.pop()
    this.current = this.queue.length
    return snapshot
  }
}

class Command {
  private history: SnapHistory

  constructor(history: SnapHistory) {
    this.history = history
  }

  undo() {
    const snapshot = this.history.go(-1)
    snapshot.restore()
  }

  redo() {
    const snapshot = this.history.go(1)
    snapshot.restore()
  }
}

class Editor {
  private content: string = ''
  private history: SnapHistory

  constructor(history: SnapHistory) {
    this.history = history
  }

  updateText(newContent: string) {
    this.content = newContent
  }

  onChange() {
    const snapshot = new Snapshot(this, this.content);
    this.history.push(snapshot)
  }
}

function memo (fn: Function) {
  const memonried = function (...args: any[]) {
    const result = memonried.__store;
    const key = args.length > 1 ? args.join('0') : args[0];
    let value = result.get(key);

    if (!result.has(key)) {
      value = fn.apply(null, args)
      result.set(key, value)
    }

    return value
  }

  memonried.__store = new Map();

  return memonried;
}

export default memo
