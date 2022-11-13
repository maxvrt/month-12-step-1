import React, {FormEvent, useState, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import { IElement, ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {

  const [inputText, setInputText] = useState<string>('');
  const [arr, setArr] = useState<IElement[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [circles, setCircles] = useState<JSX.Element[]>();
  const [spinner, setSpinner] = useState<boolean>(false);

  const arrToElements = (arr:string[]):IElement[] => {
    const elements:IElement[] = [];
    arr.forEach((el) => {
      elements.push({ value: el, state: ElementStates.Default })
    })
    return elements
  }
  const delay = (time:number) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  }
  const onChangeText = (e: FormEvent<HTMLInputElement>): void => {
    if(inputText.length===0) setCircles([]);
    const text = e.currentTarget.value;
    setInputText(text);
  }
  // отрисовка кругов при вводе
  const onKeyUp  = (e: FormEvent<HTMLInputElement>): void => {
    if(inputText.length>0 && inputText.length<=11){
      setArr(arrToElements(inputText.split('')));
      setCircles(generateCircles(arr));
    } else if(inputText.length===0) setCircles([]);
  }
  useEffect(() => {
    if(inputText.length>0 && inputText.length<=11){
      setButtonDisabled(false);
      if(circles && circles.length !== arr.length) setCircles(generateCircles(arr));
    }
    else if(inputText.length>11) setButtonDisabled(true);
  }, [inputText,circles]);

  const swap = (arr: IElement[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const reversAlgo = async (arr: IElement[]) => {
    setSpinner(true);
    await delay(1000);
    let first = 0;
    let last = arr.length -1;
    while (first <= last) {
      arr[first].state = ElementStates.Changing;
      arr[last].state = ElementStates.Changing;
      swap(arr, first, last);
      setCircles(generateCircles(arr));
      await delay(1000);
      arr[first].state = ElementStates.Modified;
      arr[last].state = ElementStates.Modified;
      setCircles(generateCircles(arr));
      first++;
      last--;
    }
    setSpinner(false);
  }
  const onRevers = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    reversAlgo(arr)
    setInputText('')
  }

  function generateCircles(arr:IElement[]):JSX.Element[] {
    const new_array:JSX.Element[] = arr.map((symbol: IElement, index: number) => {
      return (
        <li key={index}>
          <Circle letter={symbol.value} state={symbol.state} />
        </li>
      )
    });
    return new_array
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.formContainer}>
        <form className={styles.inputContainer} onSubmit={onRevers}>
          <Input onChange={onChangeText} onKeyUp={onKeyUp} value={inputText}></Input>
          <Button text="Развернуть" disabled={buttonDisabled} type="submit"></Button>
        </form>
        <p className={styles.info}>Максимум — 11 символов</p>
      </div>
      <ul className={styles.circlesContainer}>
        {circles}
      </ul>
    </SolutionLayout>
  );
};
