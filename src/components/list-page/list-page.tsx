import React, {FormEvent, useState, useEffect} from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { TElement, ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ArrowIcon } from "../ui/icons/arrow-icon";
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
class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(arr:T[]) {
    this.head = null;
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

const initArr = [{value: '0', state: ElementStates.Default},{value: '34', state: ElementStates.Default},{value: '8', state: ElementStates.Default},{value: '1', state: ElementStates.Default}];
const list = new LinkedList<TElement>(initArr);

export const ListPage: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [index, setIndex] = useState<number>();
  const [firstArr, setFirstArr] = useState<(TElement)[]>();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  const onChangeText = (e: FormEvent<HTMLInputElement>): void => {
    setText(e.currentTarget.value)
  }
  const onChangeIndex = (e: FormEvent<HTMLInputElement>): void => {
    setIndex(Number(e.currentTarget.value.trim()));
  }
  const delay = (time:number) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  }
  useEffect(() => {
    setFirstArr(initArr);
    const list1 = list.getList();
    console.log(`${JSON.stringify(list1)}`);
  },[]);

  const addToHead = async () => {
    list.prepend({value: text, state: ElementStates.Default});
    if (firstArr && firstArr[0]){
      firstArr[0].child = {value: text, state: ElementStates.Changing};
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr[0].child = undefined;
      firstArr.unshift({value: text, state: ElementStates.Changing});
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr[0].state = ElementStates.Modified;
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr[0].state = ElementStates.Default;
      setFirstArr([...firstArr]);
      setText('');
      console.log(`${JSON.stringify(firstArr)}`);
    }
  }
  const removeFromHead = async () => {
    list.deleteHead();
    if (firstArr && firstArr[0]){
      firstArr[0].childBottom = {value: firstArr[0].value, state: ElementStates.Changing};
      firstArr[0].value = '';
      setFirstArr([...firstArr]);
      await delay(2500);
      firstArr.shift();
      setFirstArr([...firstArr]);
    }
    console.log(`${JSON.stringify(list)}`);
  }

  const addToTail = async () => {
    list.append({value: text, state: ElementStates.Default});
    if (firstArr) {
      let ind = firstArr.length - 1
      firstArr[ind].child = {value: text, state: ElementStates.Changing}
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr[ind].child = undefined;
      firstArr.push({value: text, state: ElementStates.Modified});
      ind++;
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr[ind].state = ElementStates.Default;
      setFirstArr([...firstArr]);
      setText('');
    }
  }
  const removeFromTail = async () => {
    list.deleteTail();
    if (firstArr && firstArr[firstArr.length - 1]){
      firstArr[firstArr.length - 1].childBottom = {value: firstArr[firstArr.length - 1].value, state: ElementStates.Changing};
      firstArr[firstArr.length - 1].value = '';
      setFirstArr([...firstArr]);
      await delay(2500);
      firstArr.pop();
      setFirstArr([...firstArr]);
    }
    console.log(`${JSON.stringify(list)}`);
  }
  const аddByIndex = async () => {
    if(!index || !firstArr) return
    list.insertAt({value: text, state: ElementStates.Default}, index);
    for (let i = 0; i <= index; i++) {
      firstArr[i].child = {value: text, state: ElementStates.Changing}
      firstArr[i].state = ElementStates.Changing
      setFirstArr([...firstArr]);
      await delay(500);
      setFirstArr([...firstArr]);
      firstArr[i].child = undefined
    }
    firstArr[index].child = undefined
    await delay(500);
    firstArr[index].state = ElementStates.Default;
    firstArr.splice(index, 0, {value: text, state: ElementStates.Modified})
    setFirstArr([...firstArr]);
    firstArr[index].state = ElementStates.Default;
    firstArr.forEach((el) => { el.state = ElementStates.Default })
    await delay(500);
    setFirstArr([...firstArr]);
    setText('');
  }
  const delByIndex = async () => {
    if(!index || !firstArr) return
    list.deleteAt(index);
    for (let i = 0; i <= index; i++) {
      firstArr[i].state = ElementStates.Changing
      setFirstArr([...firstArr]);
      await delay(500);
      setFirstArr([...firstArr]);
    }
    firstArr[index].childBottom = {value:firstArr[index].value, state: ElementStates.Changing};
    firstArr[index].value='';
    firstArr[index].state = ElementStates.Default;
    setFirstArr([...firstArr]);
    await delay(500);
    firstArr.splice(index, 1)
    setFirstArr([...firstArr]);
    firstArr.forEach((el) => { el.state = ElementStates.Default })
    await delay(500);
    setFirstArr([...firstArr]);
    setText('');
    console.log(`${JSON.stringify(list)}`);
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.inputBlock}>
            <Input
              placeholder='Введите значение'
              maxLength={4}
              isLimitText={true}
              value={text}
              onChange={onChangeText}
            />
            <Button
              text='Добавить в head'
              onClick={addToHead}
            />
            <Button
              text='Добавить в tail'
              onClick={addToTail}
            />
            <Button
              text='Удалить из head'
              onClick={removeFromHead}
            />
            <Button
              text='Удалить из tail'
              onClick={removeFromTail}
            />
        </div>
        <div className={styles.inputByIndexBlock}>
            <Input
              onChange={onChangeIndex}
              value={index}
              maxLength={4}
              isLimitText={true}
            />
            <Button
              text='Добавить по индексу'
              onClick={аddByIndex}
            />
            <Button
              text='Удалить по индексу'
              onClick={delByIndex}
            />
        </div>
        <ul className={styles.circlesContainer}>
          {firstArr && firstArr.map((el, index) => {
            return (
            <li className={styles.item} key={index}>
              <div className={styles.innerItem}>
                {el?.child ? (
                  <div className={styles.circleItem}>
                    <Circle
                    isSmall
                    letter={el.child.value}
                    state={el.child.state}
                    />
                  </div>
                ):
                  <div className={styles.circleItem}></div>
                }
                <Circle
                  letter={el?.value}
                  index={index}
                  head={index === 0 && !el?.child ? "head" : ""}
                  tail={index === firstArr.length - 1 && !el?.childBottom ? "tail" : ""}
                  state={el?.state}

                />
                {el?.childBottom ? (
                  <div className={styles.circleItemBottom}>
                    <Circle
                    isSmall
                    letter={el.childBottom.value}
                    state={el.childBottom.state}
                    />
                  </div>
                ):
                  <div className={styles.circleItemBottom}></div>
                }
              </div>
              <div className={styles.innerArrow}>
                {index < firstArr?.length - 1 && (
                  <ArrowIcon/>
                )}
              </div>
                </li>)
          })}
            </ul>
      </div>
    </SolutionLayout>
  );
};
