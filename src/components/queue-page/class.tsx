interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getSize: () => number;
  getQueue: () => (T | null)[];
  clear: () => void;
  getHead: () => number;
  getTail: () => number;
  isEmpty: () => boolean
}
export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  //private readonly size: number = 0;
  private length: number = 0;
  private head = 0;
  private tail = 0;

  constructor(private readonly size: number) {
    this.size = size;
    this.container = Array(size);
  }
  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };
  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };
  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };
  last = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.tail-1];
  };
  isEmpty = () => this.length === 0;
  getQueue = (): (T | null)[] => {
    return this.container
  };
  getHead = () => {
    return this.head
  };
  getTail = () => {
    return this.tail
  };
  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = [];
  };
  getSize = () => this.container.length;
}
