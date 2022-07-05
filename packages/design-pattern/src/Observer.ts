/**
 * There is no doubt that the observer pattern is an event emitter.
 * But `Don't Repeat Yourself` is not for here, so let's go on.
 */
class Subscriber {
  update() {

  }
}

class Observer {
  private subscribers: { [key: string]: Array<Subscriber> } = {}

  subscribe(eventType: string, subscriber: Subscriber) {
    placeholderable<Array<Subscriber>>(this.subscribers, eventType, [])

    if (!hasSubscriber(this.subscribers[eventType], subscriber)) {
      this.subscribers[eventType].push(subscriber)
    }
  }

  unsubscribe(eventType: string, subscriber: Subscriber) {
    placeholderable<Array<Subscriber>>(this.subscribers, eventType, [])

    const queue = this.subscribers[eventType];

    if (queue && queue.length) {
      this.subscribers[eventType] = queue.reduce((newQueue, el) => {
        if (subscriber === el) {
          return newQueue
        } else {
          newQueue.push(el)
          return newQueue
        }
      }, [] as Subscriber[])
    }
  }

  notify(eventType: string) {
    const queue = this.subscribers[eventType];

    if (queue && queue.length) {
      queue.forEach((el) => {
        el.update()
      })
    }
  }
}

function placeholderable<T>(events: { [key: string]: T }, key: string, defaultValue: T): void {
  if (!events[key]) {
    events[key] = defaultValue
  }
}

function hasSubscriber (queue: Array<Subscriber>, subscriber: Subscriber): boolean {
  const l = queue?.length || 0;
  let had = false;
  let i = 0;

  while (i < l) {
    const el = queue[i];

    if (el === subscriber) {
      had = true
      break
    }

    i += 1
  }

  return had
}

export { Subscriber }
export default Observer
