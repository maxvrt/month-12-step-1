import React, {FormEvent, useState, useEffect} from "react";
import styles from './stack-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { TElement, ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./class"
import {delay} from "../utils";

let stack = new Stack<TElement>();

export const StackPage: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [firstArr, setFirstArr] = useState<TElement[]>([]);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  useEffect(() => {},[isChanging]);

  const onChangeText = (e: FormEvent<HTMLInputElement>): void => {
    setText(e.currentTarget.value)
  }
  const push = async () => {
    setIsChanging(true);
    stack.push({value:text, state:ElementStates.Changing});
    setFirstArr([...stack.getStack()]);
    await delay(500);
    const element =  stack.peak();
    if(element) element.state = ElementStates.Default;
    setIsChanging(!isChanging);
    setText('');
  }
  const pop = async () => {
    const element =  stack.peak();
    if (element) element.state = ElementStates.Changing;
    setFirstArr(stack.getStack());
    await delay(200);
    stack.pop();
    setFirstArr([...stack.getStack()]);
  }
  const del = async () => {
    await delay(200);
    stack.clear();
    setFirstArr(stack.getStack());
  }
  const getTop = (index: number) => {
    console.log('getTop');
    const lastIndex = stack.getSize() - 1;
    if (lastIndex && index === lastIndex || lastIndex === 0) return 'top'
    else return ''
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
        <Input
          onChange={onChangeText}
          value={text}
          disabled={false}
          maxLength={4}
        />
        <Button
          isLoader={false}
          text='Добавить'
          onClick={push}
          disabled={!text}
        />
        <Button
          isLoader={false}
          text='Удалить'
          onClick={pop}
          disabled={firstArr.length===0}
        />
        <Button
          text='Очистить'
          type='submit'
          onClick={del}
          disabled={firstArr.length===0}
        />
      </form>
      <ul className={styles.circlesContainer}>
        {firstArr.map((el: TElement, index: number) => {
          return (
            <Circle
                key = {index}
                index = {index}
                letter = {el.value}
                state = {el.state}
                head = {getTop(index)}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
