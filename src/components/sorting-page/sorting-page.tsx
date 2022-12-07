import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { TElement, ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import style from "./sorting-page.module.css";
import { Column } from "../ui/column/column";
import { delay } from "../utils";

export const swap = (arr: TElement[], firstIndex: number, secondIndex: number) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
// проверка режима сортировки для обоих функций
export const checkAscDesc = (isAscending: boolean, arr: TElement[], j: number, maxInd?: number) => {
  if (maxInd) {
    if ((!isAscending && parseInt(arr[maxInd].value) < parseInt(arr[j].value))||
      (isAscending && parseInt(arr[maxInd].value) > parseInt(arr[j].value))) return true
    else return false
  } else if(arr[j]?.value && arr[j + 1]?.value) {
    if ((isAscending && parseInt(arr[j].value) > parseInt(arr[j + 1].value))||
    (!isAscending && parseInt(arr[j].value) < parseInt(arr[j + 1].value))) return true
    else return false
  }
}

export const selectionSort = async (arr: TElement[], isAscending: boolean, setButtonDisabled:(isDisabled:boolean) => void, setFirstArr:(arr:TElement[]) => void, setSpinner:(isSpinner:number) => void, timeout:number ) => {
  setButtonDisabled(true);
  const { length } = arr;
  let arrCopy:string[] = [];
  for (let i = 0; i < length; i++) {
    await delay(timeout);
    let maxInd = i
    arr[i].state = ElementStates.Changing
    setFirstArr([...arr]);
    await delay(timeout);
    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing
      setFirstArr([...arr]);
      await delay(timeout);
      if (checkAscDesc(isAscending, arr, j, maxInd)) {
        if (i !== maxInd) {
          arr[maxInd].state = ElementStates.Default
          setFirstArr([...arr]);
        }
        maxInd  = j
      } else {
        arr[j].state = ElementStates.Default
        setFirstArr([...arr]);
      }
    }
    swap(arr, i, maxInd)
    arr[i].state = ElementStates.Modified
    if (i !== maxInd) {
      arr[maxInd].state = ElementStates.Default
    }
    setFirstArr([...arr]);
    const tempArr:string[] = arr.map(el=>{return el.value})
    arrCopy = [...tempArr];
  }
  setButtonDisabled(false);
  setSpinner(0);
  return arrCopy.join();
}

export const bubbleSort = async (arr: TElement[], isAscending: boolean, setButtonDisabled:(isDisabled:boolean) => void, setFirstArr:(arr:TElement[]) => void, setSpinner:(isSpinner:number) => void, timeout:number) => {
  if(arr.length < 1) return '';
  if(arr.length === 1) return arr[0].value;
  setButtonDisabled(true);
  let arrCopy:string[] = [];
  for (let i = 0; i < arr.length; i++) {
    for(let j = 0 ; j < arr.length - i - 1; j++) {
      await delay(timeout);
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setFirstArr([...arr]);
      await delay(timeout);
      if (checkAscDesc(isAscending, arr, j)) {
        swap(arr, j, j + 1)
      }
      arr[j].state = ElementStates.Default
      if (j === arr.length - i - 2) {
        arr[j + 1].state = ElementStates.Modified;
        if (j === 0) {
          arr[j].state = ElementStates.Modified;
        }
      }
      setFirstArr([...arr]);
      const tempArr:string[] = arr.map(el=>{return el.value})
      arrCopy = [...tempArr];
    }
  }
  setButtonDisabled(false);
  setSpinner(0);
  return arrCopy.join();
}

export const SortingPage: React.FC = () => {
  const rndInt = Math.floor(Math.random() * 15) + 3;
  const [firstArr, setFirstArr] = useState<TElement[]>([]);
  const [spinner, setSpinner] = useState<number>(0);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [radio, setRadio] = useState<string>('select');
  const [isNewArr, setIsNewArr] = useState<boolean>(false);

  const onClickRadio = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadio((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };
  const arrToElements = (arr:number[]):TElement[] => {
    const elements:TElement[] = [];
    arr.forEach((el) => {
      elements.push({ value: el.toString(), state: ElementStates.Default })
    })
    return elements
  }

  useEffect(() => {
    const randomArr = Array.from({length: rndInt}, () => Math.floor(Math.random() * 100));
    const elements = arrToElements(randomArr);
    setFirstArr(elements);
    setButtonDisabled(false);
  }, [isNewArr]);

  const onClickDesc = async (): Promise<void> => {
    setSpinner(2);
    if (radio === 'select') {
      selectionSort(firstArr, false, setButtonDisabled, setFirstArr, setSpinner, 500);
    } else if (radio === 'bubble') {
      bubbleSort(firstArr, false, setButtonDisabled, setFirstArr, setSpinner, 500);
    }
  }
  const onClickAsc = async (): Promise<void> => {
    setSpinner(1);
    console.log(spinner);
    if (radio === 'select') {
      selectionSort(firstArr, true, setButtonDisabled, setFirstArr, setSpinner, 500);
    } else if (radio === 'bubble') {
      bubbleSort(firstArr, true, setButtonDisabled, setFirstArr, setSpinner, 500);
    }
  }
  const OnClickNewArr = async (): Promise<void> => {
    setIsNewArr(!isNewArr);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.container}>
        <div className={style.buttonsContainer}>
          <div className={style.radio}>
            <RadioInput
                label="Выбор"
                value="select"
                name='one'
                defaultChecked
                onChange={onClickRadio}
                disabled={buttonDisabled}
            />
            <RadioInput
                label="Пузырек"
                value="bubble"
                name='one'
                onChange={onClickRadio}
                disabled={buttonDisabled}
            />
          </div>
          <div className={style.buttons}>
            <Button
                disabled={buttonDisabled}
                isLoader={spinner === 1}
                text="По возрастанию"
                onClick={onClickAsc}
                sorting={Direction.Ascending}
            />
            <Button
                disabled={buttonDisabled}
                isLoader={spinner === 2}
                text="По убыванию"
                onClick={onClickDesc}
                sorting={Direction.Descending}
            />
            <Button
                text="Новый массив"
                onClick={OnClickNewArr}
                disabled={buttonDisabled}
                isLoader={false}
            />
          </div>
        </div>
        <ul className={style.columnsContainer}>
          {firstArr.map((el: TElement, index: number) => {
            return (
              <Column
                  key={index}
                  index={parseInt(el.value)}
                  state={el.state}
              />)
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
