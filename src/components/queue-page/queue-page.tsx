import React, {FormEvent, useState, useEffect} from "react";
import styles from './queue-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { TElement, ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Queue } from "./class"
import {delay} from "../utils";

//let queue = new Queue<TElement>(7);
export const QueuePage: React.FC = () => {

  const [queue, setQueue] = useState<Queue<TElement>>(new Queue<TElement>(7));
  const [text, setText] = useState<string>('');
  const [firstArr, setFirstArr] = useState<(TElement| null)[]>([]);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [head, setHead] = useState<number>(queue.getHead());
  const [tail, setTail] = useState<number>(queue.getTail());
  const [addDisabled, setAddDisabled] = useState<boolean>(true);
  const [addingElement, setAddingElement] = useState<boolean>(false);
  const [deletingElement, setDeletingElement] = useState<boolean>(false);

  useEffect(() => {
    setFirstArr([...queue.getQueue()]);
    console.log(`text - ${text} && addingElement - ${addingElement}`);
    if (text) setAddDisabled(false)
  },[isChanging, text])

  const onChangeText = (e: FormEvent<HTMLInputElement>): void => {
    setText(e.currentTarget.value);
  }
  const enqueue = async () => {
    setAddingElement(true);
    if(firstArr.length > 7) return;
    queue.enqueue({value: text, state: ElementStates.Changing});
    setIsChanging(!isChanging);
    setTail(queue.getTail());
    await delay(500);
    const element =  queue.last();
    if(element) element.state = ElementStates.Default;
    setIsChanging(!isChanging);
    setAddingElement(false);
  }
  const dequeue = async () => {
    setDeletingElement(true);
    if (queue && !queue.isEmpty()) {
      const element =  queue.peak();
      if(element) element.state = ElementStates.Changing;
      setIsChanging(!isChanging);
      await delay(500);
      queue.dequeue();
      setFirstArr([...queue.getQueue()]);
      await delay(500);
      setHead(queue.getHead());
      setDeletingElement(false);
    }
  }
  const getTop = (index: number) => {
    if (!queue.isEmpty() && index === head) return 'top'
    else return ''
  };
  const getTail = (index: number) => {
    if (!queue.isEmpty() && index === tail - 1) return 'tail'
    else return ''
  };
  const del = () => {
    setQueue(new Queue<TElement>(7));
    setIsChanging(!isChanging);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
        <Input
          onChange={onChangeText}
          value={text}
          maxLength={4}
        />
        <Button
          isLoader={addingElement}
          text='Добавить'
          onClick={enqueue}
          disabled={addDisabled}
        />
        <Button
          isLoader={deletingElement}
          text='Удалить'
          onClick={dequeue}
          disabled={queue.isEmpty()}
        />
        <Button
          text='Очистить'
          type='submit'
          onClick={del}
          disabled={queue.isEmpty()}
        />
      </form>
      <ul className={styles.circlesContainer}>
        {firstArr.map((el: TElement | null, index: number) => {
          return (
            <Circle
                key = {index}
                index = {index}
                letter = {el?.value}
                state = {el?.state}
                head = {getTop(index)}
                tail={getTail(index)}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
