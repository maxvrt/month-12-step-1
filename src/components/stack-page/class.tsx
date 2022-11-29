interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getStack: () => T[];
  clear: () => void;
}
export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  push = (item: T): void => {
    this.container.push(item)
  };
  pop = (): void => {
    if (this.getSize()) this.container.pop()
  };
  peak = (): T | null => {
    if (this.getSize()) return this.container[this.container.length - 1]
    else return null;
  };
  getStack = (): T[] => {
    return this.container;
  }
  getSize = () => this.container.length;

  clear = (): void => {
    this.container = []
  }
}
