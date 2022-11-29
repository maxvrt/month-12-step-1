export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}
interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
  deleteAt: (index: number) => void;
  deleteHead: () => void;
}
export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;
  constructor(arr:T[]) {
    this.setList(arr);
  }
  private setList (arr:T[]) {
    this.size = arr.length;
    arr.forEach(el => this.append(el))
  }
  getList = (): LinkedList<T>| null => {
    return this;
  };
  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);
      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        // перебрать элементы в списке до нужной позиции
        while(curr?.next && currIndex < index) {
          currIndex++;
          if (curr?.next && currIndex !== index){
            curr = curr?.next
          }
        }
        // добавить элемент
        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }
      }
      this.size++;
    }
  }
  deleteAt = (index: number) => {
    if (index > this.size) return;
    if (index === 0) {
      this.deleteHead()
    } else {
      let prev = null
      let curr = this.head
      for (let i = 0; i < index; i++) {
        prev = curr
        if (curr) {
          curr = curr.next
        }
      }
      if (prev) {
        prev.next = curr ? curr.next : null
      }
      this.size--
    }
  }
  deleteHead() {
    if (this.head) {
      if (this.head.next) {
        this.head = this.head.next;
      } else {
        this.head = null
      }
      this.size--;
    }
  }
  deleteTail() {
    if (this.size < 1) {
      return;
    }
    if (this.size === 1) {
      this.head = null;
    }
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.size--;
  }
  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }
  prepend(element: T) {
    const node = new Node(element, this.head);
    this.head = node;
    this.size++;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
