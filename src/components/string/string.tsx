import React, {FormEvent, useState, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import {Input} from '../ui/input/input';
import {Button} from '../ui/button/button';
import {Circle} from '../ui/circle/circle';
import { TElement, ElementStates } from "../../types/element-states";
import {delay} from "../utils";

export const reversAlgo = async(input: string, setSpinner:(isSpinner:boolean) => void, setArr:(arr:TElement[]) => void) => {
  const swap = (firstIndex: number, secondIndex: number, innerArr: TElement[]) => {
    if(innerArr){
      const temp = innerArr[firstIndex];
      innerArr[firstIndex] = innerArr[secondIndex];
      innerArr[secondIndex] = temp;
    }
  };
  setSpinner(true);
  const elements:TElement[] = [];
  input.split('').forEach((el) => {
    elements.push({ value: el, state: ElementStates.Default })
  })
  setArr([...elements]);
  await delay(1000);
  let first = 0;
  let last = elements.length -1;
  while (first <= last) {
    elements[first].state = ElementStates.Changing;
    elements[last].state = ElementStates.Changing;
    swap(first, last, elements);
    setArr([...elements]);
    await delay(1000);
    elements[first].state = ElementStates.Modified;
    elements[last].state = ElementStates.Modified;
    setArr([...elements]);
    first++;
    last--;
  }
  setSpinner(false);
  let newString = '';
  elements.map(el=>{
    newString = newString + el.value;
  })
  return newString;
}

export const StringComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [arr, setArr] = useState<TElement[]>();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  //const [circles, setCircles] = useState<JSX.Element[]|null>();
  const [spinner, setSpinner] = useState<boolean>(false);

  const onChangeText = (e: FormEvent<HTMLInputElement>): void => {
    const text = e.currentTarget.value;
    setInputText(text);
  }

  useEffect(() => {
    if(inputText.length>0 && inputText.length<=11){
      setButtonDisabled(false);
      //if(arr && circles && circles.length !== arr?.length) setCircles([...generateCircles(arr)]);
    }
    else if(inputText.length>11) setButtonDisabled(true);
  }, [inputText,arr]);

  const onRevers = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    reversAlgo(inputText, setSpinner, setArr)
    setInputText('')
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.formContainer}>
        <form className={styles.inputContainer} onSubmit={onRevers}>
          <Input onChange={onChangeText} value={inputText} maxLength={11} type="text"></Input>
          <Button text="Развернуть" disabled={buttonDisabled} isLoader={spinner} type="submit"></Button>
        </form>
        <p className={styles.info}>Максимум — 11 символов</p>
      </div>
      <ul className={styles.circlesContainer}>
        {arr?.map((symbol: TElement, index: number) => {
          return (
            <li key={index}>
            <Circle letter={symbol.value} state={symbol.state} />
          </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
