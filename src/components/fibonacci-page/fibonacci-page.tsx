import React, {FormEvent, useState, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [arr, setArr] = useState<number[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [circles, setCircles] = useState<JSX.Element[]>();
  const [spinner, setSpinner] = useState<boolean>(false);

  useEffect(() => {
    if(inputText.length>0 && inputText.length<=2){
      setButtonDisabled(false);
    }
    else if(inputText.length>2) setButtonDisabled(true);
  }, [inputText,circles]);

  const onChangeText = (e: FormEvent<HTMLInputElement>): void => {
    if(inputText.length===0) setCircles([]);
    const text = e.currentTarget.value;
    setInputText(text);
  }

  const delay = (time:number) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  }
  const fibIterative = (n: number): number[] => {
    let arr: number[] = [0, 1];
    for (let i = 2; i < n + 1; i++){
      arr.push(arr[i - 2] + arr[i -1]);
    }
   return arr;
  }
  const fibRender = async (n: any) => {
    setSpinner(true);
    const arrInner = fibIterative(n);
    for (let i = 0; i < arrInner.length; i++){
      await delay(500);
      setArr(arrInner.slice(0, i + 1));
    }
    setSpinner(false);
  }
  const onCLick = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if(inputText.length>0 && inputText.length<=2){
      const numb = parseInt(inputText);
      if (numb >=1 && numb <= 19) {
        fibRender(numb);
        setInputText('')
      };
    } else if(inputText.length===0) setCircles([])
    else console.log('Неправильное число');
  }

  function generateCircles(arr:number[]):JSX.Element[] {
    const new_array:JSX.Element[] = arr.map((symbol: number, index: number) => {
      return (
        <li key={index}>
          <Circle letter={symbol.toString()}/>
        </li>
      )
    });
    return new_array
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.formContainer}>
        <form className={styles.inputContainer} onSubmit={onCLick}>
          <Input onChange={onChangeText} value={inputText}></Input>
          <Button text="Рассчитать" disabled={buttonDisabled} isLoader={spinner} type="submit"></Button>
        </form>
        <p className={styles.info}>Максимальное число — 19</p>
      </div>
      <ul className={styles.circlesContainer}>
        {arr && arr.map((symbol: number, index: number) => {
          return (
            <li key={index}>
              <Circle letter={symbol.toString()}/>
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
